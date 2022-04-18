import React from "react";
import { Image, Container, Text } from "@chakra-ui/react";

import MERNLogo from "../../Assets/MERNLogo.png";

const Header: React.FC = () => {
   return (
       <Container centerContent>
        <Container maxW="xs">
            <Image src={MERNLogo} objectFit="contain" />
        </Container>
        <Text>MongoDB + Express + React + Node To Do</Text>
       </Container>
   )
};

export default Header;
