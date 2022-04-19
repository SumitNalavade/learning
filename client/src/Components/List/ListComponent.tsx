import React, { useState } from "react";
import { Container, Input, IconButton, Tooltip } from "@chakra-ui/react";
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

    const [inputValue, setInputValue] = useState<string>(""); 
    
    const handleToggleComplete = () => {
        const { name, description, complete, id } = todo
        updateMutation.mutate({name, description, complete: !complete, id})
    }

    const handleDeleteTodo = () => {
       deleteMutation.mutate(todo)
    };

    const handleSubmit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.key === "Enter") {
            alert(inputValue);
        }
    }

    return (
        <Container mt={4} style={{width: "100%", display: "flex", alignItems: "center"}} >
            <Tooltip label="Edit todo" >
                <Input onKeyDown={handleSubmit} onChange={(evt) => setInputValue(evt.target.value)} style={{display: complete ? "none" : "flex"}} />
            </Tooltip>

            <Tooltip label="Edit todo" >
                <Input value={inputValue} isDisabled style={{display: complete ? "flex" : "none"}} />
            </Tooltip>
    

            <Tooltip label="Toggle complete">
                <IconButton onClick={handleToggleComplete}  mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
            </Tooltip>
            <Tooltip label="Delete">
                <IconButton onClick={handleDeleteTodo} mx={2} size='sm' icon={<CloseIcon color="red" />} aria-label={""} />
            </Tooltip>

        </Container>
    )
};

export default ListComponent;