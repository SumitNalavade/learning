import React from "react";
import { Container, Spinner } from "@chakra-ui/react";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../Utils/QueryClient";

import Header from "./Header/Header";
import List from "./List/List";
import { fetchTodosAsync, deleteTodoAsync, updateTodoAsync } from "../Utils/AppController";

const App: React.FC = ({ }) => {
    const { isLoading, error, data: todos = [] } = useQuery("todos", fetchTodosAsync);

    const deleteMutation = useMutation(deleteTodoAsync, {
        onSuccess: data => {
        queryClient.invalidateQueries("todos");
        queryClient.setQueryData(todos, data)
        }
    });

    const updateMutation = useMutation(updateTodoAsync, {
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
                    <List todos={todos} deleteMutation={deleteMutation} updateMutation={updateMutation} />
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