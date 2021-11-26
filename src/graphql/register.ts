import { gql } from 'urql'

export const REGISTER = gql`
    mutation Register(
        $name: String!
        $email: String!
        $password: String!
        $city: String!
        $state: String!
    ) {
        register(
            name: $name
            email: $email
            password: $password
            state: $state
            city: $city
        ) {
            user {
                id
                name
                username
                email
                city
                state
            }
            error
        }
    }
`
