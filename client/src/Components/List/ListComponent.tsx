import React from "react";
import { Container, Input, IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import TodoInterface from "../../Utils/TodoInterface";

interface Props {
    todo: TodoInterface
}

const ListEditable: React.FC<Props> = ({ todo }) => {
    return (
        <Container mt={4} style={{width: "100%", display: "flex", alignItems: "center"}} >
            <Input value={todo.name} />
            <IconButton mx={2} size='sm' icon={<CheckIcon />} aria-label={""} />
            <IconButton mx={2} size='sm' icon={<CloseIcon />} aria-label={""} />
        </Container>
    )
};

export default ListEditable;