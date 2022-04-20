import React, { useEffect } from "react";
import { Container, Spinner } from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../Utils/QueryClient";

import Header from "./Header/Header";
import List from "./List/List";
import NewTodoInput from "./NewTodoInput/NewTodoInput";
import TodoInterface from "../Utils/TodoInterface";

import { fetchTodosAsync, deleteTodoAsync, updateTodoAsync, createNewTodoAsync } from "../Utils/AppController";

const App: React.FC = ({ }) => {
    const { isLoading, error, data: todos = [] } = useQuery("todos", fetchTodosAsync);

    //Optimistcally delete a specific todo
    const deleteMutation = useMutation(deleteTodoAsync, {
        onMutate: async deleteTodo => {
            await queryClient.cancelQueries("todos");
            const previousTodos: TodoInterface[] | undefined = queryClient.getQueryData("todos")
            queryClient.setQueryData(todos, todos.map((todo: TodoInterface, index) => todo.id === deleteTodo.id ? todos.splice(index, 1) : console.log()))
            return { previousTodos }
        },
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData('todos', context?.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        },
    });

    //Optimistically flip a specific todos complete state
    const toggleCompleteMutation = useMutation(updateTodoAsync, {
        onMutate: async updateTodo => {
            await queryClient.cancelQueries("todos");
            const previousTodos: TodoInterface[] | undefined = queryClient.getQueryData("todos")
            queryClient.setQueryData(todos, todos?.map((todo: TodoInterface) => todo.id === updateTodo.id ? todo.complete = !todo.complete : console.log()))
            return { previousTodos }
        },
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData('todos', context?.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        },
    });

    //Optimistically update a todo (Name & Description)
    const updateTodoMutation = useMutation(updateTodoAsync, {
        onMutate: async updateTodo => {
            await queryClient.cancelQueries("todos");
            const previousTodos: TodoInterface[] | undefined = queryClient.getQueryData("todos");
            todos.map((todo: TodoInterface) => todo.id === updateTodo.id ? todo.name = updateTodo.name : console.log());
            todos.map((todo: TodoInterface) => todo.id === updateTodo.id ? todo.description = updateTodo.description : console.log());
            return { previousTodos }
        },
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData('todos', context?.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        },
    });

    //Optimistically create a new todo and add it to the todos array
    const createNewTodoMutation = useMutation(createNewTodoAsync, {
        onMutate: async newTodo => {
            await queryClient.cancelQueries("todos");
            const previousTodos: TodoInterface[] | undefined = queryClient.getQueryData("todos");
            todos.push(newTodo);
            return { previousTodos }
        },
        onError: (err, newTodo, context: any) => {
            queryClient.setQueryData('todos', context?.previousTodos)
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos')
        },
    });

    return (
        <Container bgGradient='linear(to-br, #feeaae, pink.500)' maxW="100vw" style={styles}>
            <Container centerContent  maxW="container.md" height="80%" borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor="white" p={6} >
                <Container style={{height: "30%"}} >
                    <Header />
                </Container>

                <Spinner size="xl" style={{display: isLoading ? "flex" : "none" }} />

                <Container size="lg" style={{height: "60%"}} >
                    <List todos={todos} deleteMutation={deleteMutation} toggleCompleteMutation={toggleCompleteMutation} updateTodoMutation={updateTodoMutation} />
                </Container>

                <NewTodoInput createNewTodoMutation={createNewTodoMutation} />
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