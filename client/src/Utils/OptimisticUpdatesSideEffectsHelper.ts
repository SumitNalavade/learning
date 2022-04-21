import { queryClient } from "../Utils/QueryClient";
import TodoInterface from "./TodoInterface";

export const onError = async(context: any) => {
    queryClient.setQueryData('todos', context?.previousTodos)
};

export const onSettled = () => {
    queryClient.invalidateQueries('todos')
}

export const onMutate = async(todo: TodoInterface, fn: any) => {
    await queryClient.cancelQueries("todos");
    const previousTodos: TodoInterface[] | undefined = queryClient.getQueryData("todos");
    fn();
    return { previousTodos }
};