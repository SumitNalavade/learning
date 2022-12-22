import React, { useState } from "react";
import { GetServerSideProps } from "next";

import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";

import supabase from "../lib/supabase";

interface Props {
    data: any
}

const Todos: React.FC<Props> = ({ data }) => {
    const [todoName, setTodoName] = useState("");


    const insertTodo = async() => {
        const { data, error } = await supabase
        .from('todos')
        .insert([
          { name: todoName },
        ])

        console.log(data);
        console.error(error)
    }

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
                        onClick={insertTodo}
                    >
                        Submit
                    </Button>
                </Flex>
            </FormControl>
          </Container>
          
        </Container>
    )
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { userid } = context.query;

//     // Pass data to the page via props
//     return { props: { data } }
// }

export default Todos;