import React from "react";
import { Container, Input, IconButton, Tooltip, Spinner } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import TodoInterface from "../../Utils/TodoInterface";

interface Props {
    todo: TodoInterface
    deleteTodo: { deleteTodoMutation: (todo: TodoInterface) => unknown, deleteTodoIsLoading: boolean, deleteTodoIsError: boolean  }
}

const ListEditable: React.FC<Props> = ({ todo, deleteTodo }) => {
    const { name, complete } = todo
    
    if(complete) {
        return (
            <Container mt={4} style={{width: "100%", display: "flex", alignItems: "center"}} >
                <Tooltip label="Edit todo" >
                    <Input value={name} isDisabled />
                </Tooltip>
    
                <Tooltip label="Toggle complete">
                    <IconButton mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
                </Tooltip>
                <Tooltip label="Delete">
                    <IconButton mx={2} size='sm' icon={<CloseIcon color="red" />} aria-label={""} />
                </Tooltip>
    
            </Container>
        )
    } 

    return (
        <Container mt={4} style={{width: "100%", display: "flex", alignItems: "center"}} >
            <Tooltip label="Edit todo" >
                <Input value={name} />
            </Tooltip>

            <Tooltip label="Toggle complete">
                <IconButton mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
            </Tooltip>
            <Tooltip label="Delete">
                <IconButton onClick={() => deleteTodo.deleteTodoMutation(todo)} mx={2} size='sm' icon={deleteTodo.deleteTodoIsLoading ? <Spinner color='red' /> : <CloseIcon color="red" />} aria-label={""} />
            </Tooltip>

        </Container>
    )
};

export default ListEditable;