import create from 'zustand'
import { User } from '@supabase/supabase-js'

interface AppState {
    user: User | null
    setUser: (user: User) => void
}

export const useAppStore = create<AppState>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ user }))
}));