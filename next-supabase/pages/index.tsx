import React from "react";
import Head from 'next/head'

import { Heading, Text, Container } from '@chakra-ui/react'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import supabase from "../lib/supabase"

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Next - Supabase Todo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container padding={12}>
          <Container centerContent>
            <Heading color="teal.300">Chores</Heading>
            <Text fontWeight='bold' color='blackAlpha.700'>Built with Next.js and Supabase</Text>
          </Container>

          <Auth supabaseClient={supabase}
            // @ts-ignore
            appearance={{ theme: ThemeSupa }}
          />
          
        </Container>
      </main>
    </>
  )
};

export default Home;
