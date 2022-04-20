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

    const handleSubmit = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        if(evt.key === "Enter") {
            createNewTodoMutation.mutate({ name: inputValue, complete: false })
        }
    }

    return (
        <InputGroup size="md" mb={12} style={{display: "flex", alignItems: "center"}} >
            <InputLeftAddon children='I want to...' />
            <Input value={inputValue} onKeyDown={handleSubmit} onChange={(evt) => setInputValue(evt.target.value)} placeholder='To-Do title' />
            <IconButton onClick={() => createNewTodoMutation.mutate({ name: inputValue, complete: false })} mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
        </InputGroup>
    );
};

export default NewTodoInput;
