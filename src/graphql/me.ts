import { gql } from 'urql'

export const ME = gql`
    query Me {
        me {
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
