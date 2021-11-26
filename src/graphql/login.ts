import { gql } from 'urql'

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
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
