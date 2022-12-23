import supabase from "./supabase"

export const readTodos = async(userid: string) => {
    const { data, error } = await supabase
        .from('todos')
        .select("*")
        .eq('user_id', userid)

    return data;
}

export const deleteTodo = async(todoid: string) => {
    const { data, error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoid)

    return data
}