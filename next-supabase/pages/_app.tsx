import { useEffect } from 'react';

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';

import { ChakraProvider } from '@chakra-ui/react'

import supabase from '../lib/supabase'

import useAppStore from '../stores/useAppStore';
import Todo from '../lib/todoSchema';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  const todos = useAppStore((state) => state.todos);
  const setTodos = useAppStore((state) => state.setTodos);
  
  useEffect(() => {
    router.prefetch("/todos")
  }, [])

  supabase.auth.onAuthStateChange((event, session) => {
    if(session) {
      setUser(session!.user);

      router.replace(`/todos?userid=${session!.user.id}`, {
        // @ts-ignore
        query: user
      });
    }
  });

  supabase.channel('custom-all-channel')
  .on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'todos' },
  (payload) => {
      const { eventType } = payload

      const myTodos = [...todos]

      switch(eventType)  {
        case "INSERT": 
          myTodos.push(payload.new as Todo);
          setTodos(myTodos);
          break;
        case "DELETE":
          setTodos(todos.filter((todo) => todo.id != payload.old.id));
          break;
        case "UPDATE":
          myTodos.forEach((todo) => todo.id === payload.new.id ? todo.complete = !todo.complete : "")
          setTodos(myTodos);
      } 
  }
  )
  .subscribe()

  return (
      <ChakraProvider>      
        <Component {...pageProps} />
      </ChakraProvider>
  )
}
