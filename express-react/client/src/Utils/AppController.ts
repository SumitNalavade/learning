import axios from "axios";

import TodoInterface from "./TodoInterface";

//Return a promise containing all todos
export const fetchTodosAsync = async(): Promise<TodoInterface[]> => {
    const { data } = await axios.get("/todos");
    return data.todos
};

//Delete a specific todo and return an array of the remaining todos
export const deleteTodoAsync = async(todo: TodoInterface): Promise<TodoInterface[]> => {
    const { id } = todo;
    const { data } = await axios.delete(`/todos/${id}`);
    return data.todos;
};

export const updateTodoAsync = async(todo: TodoInterface): Promise<TodoInterface[]> => {
    const { id } = todo;
    const { data } = await axios.patch(`/todos/${id}`, { ...todo });
    return data.todos
};

export const createNewTodoAsync = async (todo: TodoInterface): Promise<TodoInterface[]> => {
    const { data } = await axios.post("/todos", { ...todo });
    return data.todo;
}