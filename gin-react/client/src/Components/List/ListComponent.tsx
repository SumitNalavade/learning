import React, { useEffect, useState } from "react";
import { Container, IconButton, Tooltip, Input } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { UseMutationResult } from "react-query";

import TodoInterface from "../../Utils/TodoInterface";

interface Props {
    todo: TodoInterface
    mutations: {
        deleteMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
        toggleCompleteMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
        updateTodoMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
        createNewTodoMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
    }
}

const ListComponent: React.FC<Props> = ({ todo, mutations }) => {
    const { name, complete } = todo

    const [inputValue, setInputValue] = useState<string>(todo.name);
    
    useEffect(() => {
        setInputValue(todo.name);
    });
    
    const handleToggleComplete = () => {
        const { name, description, complete, id } = todo
        mutations.toggleCompleteMutation.mutate({name, description, complete: !complete, id})
    }

    const handleDeleteTodo = () => {
       mutations.deleteMutation.mutate(todo)
    };

    const handleSubmit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.key === "Enter") {
            const { name, description, complete, id } = todo;
            mutations.updateTodoMutation.mutate({name: inputValue, description, complete, id})
        }
    }

    return (
        <Container mt={4} style={{width: "100%", display: "flex", alignItems: "center"}} >
            <Tooltip label="Edit todo" >
                <Input onKeyDown={handleSubmit} value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} style={{display: complete ? "none" : "flex"}} />
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