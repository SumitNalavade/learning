import create from 'zustand'
import { User } from '@supabase/supabase-js'
import Todo from "../lib/todoSchema";

interface AppState {
    user: User | null
    setUser: (user: User) => void

    todos: Todo[]
    setTodos: (todos: Todo[]) => void
}

const useAppStore = create<AppState>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user })),

  todos: [],
  setTodos: (todos) => set((state) => ({ todos }))
}));

export default useAppStore;