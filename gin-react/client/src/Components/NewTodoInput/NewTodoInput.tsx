import React, { useState } from "react";
import { UseMutationResult } from "react-query";

import { Input, InputGroup, InputLeftAddon, IconButton } from '@chakra-ui/react'
import { CheckIcon } from "@chakra-ui/icons";
import TodoInterface from "../../Utils/TodoInterface";

interface Props {
    createNewTodoMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
};

const NewTodoInput: React.FC<Props> = ({ createNewTodoMutation }) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleSubmit = () => {
        createNewTodoMutation.mutate({ name: inputValue, complete: false });
        setInputValue("");
    };

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value);
    }

    return (
        <InputGroup size="md" my={10} style={{display: "flex", alignItems: "center"}} >
            <InputLeftAddon children='I want to...' />
            <Input value={inputValue} onKeyDown={(evt) => evt.key === "Enter" ? handleSubmit() : console.log() } onChange={handleChange} placeholder='To-Do title' />
            <IconButton onClick={handleSubmit} mx={2} size='sm' icon={<CheckIcon color="green" />} aria-label={""} />
        </InputGroup>
    );
};

export default NewTodoInput;
