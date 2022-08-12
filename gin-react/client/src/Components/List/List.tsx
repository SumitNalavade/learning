import React from "react";
import { UseMutationResult } from "react-query";

import TodoInterface from "../../Utils/TodoInterface";
import ListComponent from "./ListComponent";

interface Props {
    todos: TodoInterface[]
    mutations: {
        deleteMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
        toggleCompleteMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
        updateTodoMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
        createNewTodoMutation: UseMutationResult<TodoInterface[], unknown, TodoInterface, any>
    }
}

const List: React.FC<Props> = ({ todos, mutations }) => {
    return (
        <div>
            {todos.map((todo, index) => <ListComponent key={index} todo={todo} mutations={mutations} />)}
        </div>
    )
};

export default List;
