import React from "react"

import { CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, FormLabel, IconButton, Box } from "@chakra-ui/react";

import TodoType from "../lib/todoSchema";
import { deleteTodo } from "../lib/todoFunctions";

interface Props {
    todo: TodoType
}

const Todo: React.FC<Props> = ({ todo }) => {
    return (
        <Flex justifyContent="space-between" alignItems="center" padding={6} marginY={4} border='1px' borderColor='gray.200' borderRadius='lg'>
            <Box>
                <FormLabel color='blackAlpha.700'>{ todo.name }</FormLabel>
            </Box>

            <Box>
                <IconButton disabled={ todo.complete } margin={1} aria-label='Complete Todo' icon={<CheckIcon />} />
                <IconButton disabled={ !todo.complete } margin={1} aria-label='Incomplete Todo' icon={<CloseIcon />} />
                <IconButton onClick={() => deleteTodo(todo.id)} margin={1} aria-label='Delete Todo' icon={<DeleteIcon />} />
            </Box>
        </Flex>
    )
}

export default Todo;
