import React from "react";
import { Container, Box } from "@chakra-ui/react";

import TodoInterface from "../Utils/TodoInterface";

import Header from "./Header/Header";
import List from "./List/List";

interface Props {
    todos: TodoInterface[]
}

const MainContainer: React.FC<Props> = ({ todos }) => {
    return (
        <Container bgGradient='linear(to-br, #feeaae, pink.500)' maxW="100vw" style={styles}>
            <Container centerContent  maxW="container.md" height="80%" borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor="white" p={6} >
                <Container style={{height: "30%"}} >
                    <Header />
                </Container>
                <Container size="lg" style={{height: "60%"}} >
                    <List todos={todos} />
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

export default MainContainer;