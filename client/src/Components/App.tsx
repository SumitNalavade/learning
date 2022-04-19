import React from "react";
import { Container, Spinner } from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../Utils/QueryClient";

import Header from "./Header/Header";
import List from "./List/List";
import { fetchTodosAsync, deleteTodoAsync } from "../Utils/AppController";
import TodoInterface from "../Utils/TodoInterface";

const App: React.FC = ({ }) => {
    const { isLoading, error, data: todos = [] } = useQuery("todos", fetchTodosAsync);

    const { mutate, isLoading: deleteTodoIsLoading, isError: deleteTodoIsError } = useMutation(deleteTodoAsync, {
        onSuccess: data => {
        queryClient.invalidateQueries("todos");
        queryClient.setQueryData(todos, data)
        }
    });

    return (
        <Container bgGradient='linear(to-br, #feeaae, pink.500)' maxW="100vw" style={styles}>
            <Container centerContent  maxW="container.md" height="80%" borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor="white" p={6} >
                <Container style={{height: "30%"}} >
                    <Header />
                </Container>

                <Spinner size="xl" style={{display: isLoading ? "flex" : "none" }} />

                <Container size="lg" style={{height: "60%"}} >
                    <List todos={todos} deleteTodo={{ deleteTodoMutation: (todo: TodoInterface) => mutate(todo) , deleteTodoIsLoading, deleteTodoIsError}} />
                </Container>
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