import React from "react";
import { Container, Input, IconButton, Tooltip, Spinner } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { UseMutationResult } from "react-query";

import TodoInterface from "../../Utils/TodoInterface";

interface Props {
    todo: TodoInterface
    deleteMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, unknown>
    updateMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, unknown>
}

const ListComponent: React.FC<Props> = ({ todo, deleteMutation, updateMutation }) => {
    const { name, complete } = todo

    const handleToggleComplete = () => {
        const { name, description, complete, id } = todo
        updateMutation.mutate({name, description, complete: !complete, id});
    }

    const handleDeleteTodo = () => {
        deleteMutation.mutate(todo);
    }
    
    return (
        <Container mt={4} style={{width: "100%", display: "flex", alignItems: "center"}} >
            <Tooltip label="Edit todo" >
                <Input value={name} style={{display: complete ? "none" : "flex"}} />
            </Tooltip>

            <Tooltip label="Edit todo" >
                    <Input value={name} isDisabled style={{display: complete ? "flex" : "none"}} />
            </Tooltip>
    

            <Tooltip label="Toggle complete">
                <IconButton onClick={handleToggleComplete}  mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
            </Tooltip>
            <Tooltip label="Delete">
                <IconButton onClick={handleDeleteTodo} mx={2} size='sm' icon={deleteMutation.isLoading ? <Spinner color='red' /> : <CloseIcon color="red" />} aria-label={""} />
            </Tooltip>

        </Container>
    )
};

export default ListComponent;