import React, { useEffect, useState } from "react";
import { Container, Spinner, Alert, AlertIcon, CloseButton } from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../Utils/QueryClient";

import Header from "./Header/Header";
import List from "./List/List";
import NewTodoInput from "./NewTodoInput/NewTodoInput";
import TodoInterface from "../Utils/TodoInterface";

import { fetchTodosAsync, deleteTodoAsync, updateTodoAsync, createNewTodoAsync } from "../Utils/AppController";
import { onError, onSettled, onMutate } from "../Utils/OptimisticUpdatesSideEffectsHelper";

const App: React.FC = ({ }) => {
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const { isLoading, error, data: todos = [] } = useQuery("todos", fetchTodosAsync);

    if(error) {
        setShowErrorAlert(true);
    }

    const mutations = {
        //Optimistcally delete a specific todo
        deleteMutation: useMutation(deleteTodoAsync, {
            onMutate: deleteTodo => onMutate(deleteTodo, () => queryClient.setQueryData(todos, todos.map((todo: TodoInterface, index) => todo.id === deleteTodo.id ? todos.splice(index, 1) : console.log()))),
            onError: (err, newTodo, context: any) => onError(context).then(() => setShowErrorAlert(true)),
            onSettled: () => onSettled()
        }),

        //Optimistically flip a specific todos complete state
        toggleCompleteMutation: useMutation(updateTodoAsync, {
            onMutate: updateTodo => onMutate(updateTodo, () => queryClient.setQueryData(todos, todos?.map((todo: TodoInterface) => todo.id === updateTodo.id ? todo.complete = !todo.complete : console.log()))),
            onError: (err, newTodo, context: any) => onError(context).then(() => setShowErrorAlert(true)),
            onSettled: () => onSettled()
        }),

        //Optimistically update a todo (Name & Description)
        updateTodoMutation: useMutation(updateTodoAsync, {
            onMutate: updateTodo => onMutate(updateTodo, () => todos.map((todo: TodoInterface) => todo.id === updateTodo.id ? todo.name = updateTodo.name : console.log())),
            onError: (err, newTodo, context: any) => onError(context).then(() => setShowErrorAlert(true)),
            onSettled: () => onSettled()
        }),
        
        //Optimistically create a new todo and add it to the todos array
        createNewTodoMutation: useMutation(createNewTodoAsync, {
            onMutate: async newTodo => onMutate(newTodo, () => todos.push(newTodo)),
            onError: (err, newTodo, context: any) => onError(context).then(() => setShowErrorAlert(true)),
            onSettled: () => onSettled()
        })
    };

    return (
        <Container bgGradient='linear(to-br, #feeaae, pink.500)' maxW="100vw" style={styles}>
            <Container centerContent  maxW="container.md" height="80%" borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor="white" p={6} >
                <Container style={{height: "30%"}} >
                    <Header />
                </Container>
                
                <Alert status='error' style={{display: showErrorAlert ? "flex" : "none"}}>
                    <AlertIcon />
                    There was an error processing your request
                    <CloseButton onClick={() => setShowErrorAlert(false)} position='absolute' right='8px' top='8px' />
                </Alert>

                <Spinner size="xl" style={{display: isLoading ? "flex" : "none" }} />

                <Container size="lg" style={{height: "60%", overflowY: 'scroll', whiteSpace: "nowrap"}} >
                    <List todos={todos} mutations={mutations} />
                </Container>

                <NewTodoInput createNewTodoMutation={mutations.createNewTodoMutation} />
            </Container>
        </Container>
    )
}

const styles = {
  height: "100vh",
  widht: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default App;