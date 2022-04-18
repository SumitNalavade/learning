import React from "react";

import TodoInterface from "../../Utils/TodoInterface";

import ListEditable from "./ListComponent";

interface Props {
    todos: TodoInterface[]
}

const List: React.FC<Props> = ({ todos }) => {
    return (
        <div>
            {todos.map((todo, index) => <ListEditable key={index} todo={todo} />)}
        </div>
    )
};

export default List;
