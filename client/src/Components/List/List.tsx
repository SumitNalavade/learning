import React from "react";

import TodoInterface from "../../Utils/TodoInterface";
import ListComponent from "./ListComponent";

interface Props {
    todos: TodoInterface[]
    deleteTodo: { deleteTodoMutation: (todo: TodoInterface) => unknown, deleteTodoIsLoading: boolean, deleteTodoIsError: boolean  }
}

const List: React.FC<Props> = ({ todos, deleteTodo }) => {
    return (
        <div>
            {todos.map((todo, index) => <ListComponent key={index} todo={todo} deleteTodo={deleteTodo} />)}
        </div>
    )
};

export default List;
