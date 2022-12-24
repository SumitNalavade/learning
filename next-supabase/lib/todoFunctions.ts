import supabase from "./supabase"

export const readTodos = async(userid: string) => {
    const { data, error } = await supabase
        .from('todos')
        .select("*")
        .eq('user_id', userid)

    return data;
}

export const createTodo = async(userid: string, todoName: string) => {
    throw new Error();


    const { data, error } = await supabase
        .from('todos')
        .insert([
        { name: todoName, user_id: userid },
    ]);

    return data;
}

export const deleteTodo = async(todoid: string) => {
    const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoid)

    return data
}

export const flipTodoStatus = async (todoid: string, currStatus: boolean) => {
    const { data, error } = await supabase
        .from('todos')
        .update({ complete: !currStatus })
        .eq('id', todoid)

    return data;
}