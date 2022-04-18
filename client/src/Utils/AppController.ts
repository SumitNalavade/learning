import axios from "axios";

import TodoInterface from "./TodoInterface";

//Return a promise containing all todos
export const fetchTodosAsync = async(): Promise<TodoInterface[]> => {
    const { data } = await axios.get("/todos");
    return data.todos
}