import React, { useState } from "react";
import { UseMutationResult } from "react-query";

import { Input, InputGroup, InputLeftAddon, IconButton } from '@chakra-ui/react'
import { CheckIcon } from "@chakra-ui/icons";
import TodoInterface from "../../Utils/TodoInterface";

interface Props {
    createNewTodoMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, unknown>
};

const NewTodoInput: React.FC<Props> = ({ createNewTodoMutation }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleCreateTodo = () => {
        createNewTodoMutation.mutate({ name: inputValue, complete: false })
    };

    return (
        <InputGroup size="md" mb={12} style={{display: "flex", alignItems: "center"}} >
            <InputLeftAddon children='I want to...' />
            <Input value={inputValue} onChange={(evt) => setInputValue(evt.target.value)} placeholder='To-Do title' />
            <IconButton onClick={handleCreateTodo} mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
        </InputGroup>
    );
};

export default NewTodoInput;
