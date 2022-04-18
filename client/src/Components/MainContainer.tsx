import React from "react";
import { Container } from "@chakra-ui/react";

import Header from "./Header/Header";
import List from "./List/List";

const MainContainer: React.FC = () => {
    return (
        <Container bgGradient='linear(to-br, #feeaae, pink.500)' maxW="100vw" style={styles}>
            <Container centerContent  maxW="container.md" height="80%" borderWidth='1px' borderRadius='lg' overflow='hidden' bgColor="white" p={6} >
                <Header />
                <List />
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