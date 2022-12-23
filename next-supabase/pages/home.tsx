import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { Button, Container, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import Todo from "../components/todo";

import TodoType from "../lib/todoSchema";
import { readTodos, createTodo } from "../lib/todoFunctions";

import useAppStore from "../stores/useAppStore";

interface Props {
    data: TodoType[]
}

const Home: React.FC<Props> = ({ data }) => {
    const user = useAppStore((state) => state.user);
    const [todoName, setTodoName] = useState("");

    return (
        <Container padding={12}>
          <Container centerContent>
            <Heading color="teal.300">Chores</Heading>
            <Text fontWeight='bold' color='blackAlpha.700'>Built with Next.js and Supabase</Text>
          </Container>

          <Container marginY={12} paddingY={6} border='1px' borderColor='gray.200' borderRadius='lg'>
            <FormControl>
                <FormLabel color='blackAlpha.700'>Todo Name</FormLabel>
                <Input value={todoName} onChange={(evt) => setTodoName(evt.target.value)} placeholder='Wash the dishes' />

                <Flex justifyContent={'flex-end'}>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        type='submit'
                        size={"sm"}
                        onClick={() => createTodo(user!.id, todoName)}
                    >
                        Submit
                    </Button>
                </Flex>
            </FormControl>
          </Container>

          <Container>
            { data.map((todo: TodoType) => {
                return (
                    <Todo key={data.indexOf(todo)} todo={todo} />
                )
            }) }
          </Container>

        </Container>
    )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { userid } = context.query;

    const data = await readTodos(userid! as string);

    // Pass data to the page via props
    return { props: { data } }
}

export default Home;
