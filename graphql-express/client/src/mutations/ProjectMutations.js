import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
    mutation AddProject($name: String!, $description: String!, $clientId: ID!, $status: ProjectStatus!) {
        addProject(name: $name, description: $description, clientId: $clientId, status: $status) {
            id,
            name,
            description,
            status,
            client {
                id,
                name,
                email,
                phone
            }
        }
    }
`

export { ADD_PROJECT };