import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';

import { ChakraProvider } from '@chakra-ui/react'

import supabase from '../lib/supabase'

import useAppStore from '../stores/useAppStore';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  supabase.auth.onAuthStateChange((event, session) => {
    if(session) {
      setUser(session!.user);

      router.push(`/todos?userid=${session!.user.id}`, {
        // @ts-ignore
        query: user
      });
    }
  });

  return (
      <ChakraProvider>      
        <Component {...pageProps} />
      </ChakraProvider>
  )
}
