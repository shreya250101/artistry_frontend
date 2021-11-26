import { gql } from '@urql/core'

export const GET_USERS_IN_MY_CITY = gql`
    query GetUsersInMyCity($event: Int!) {
        getUsersInMyCity(event: $event) {
            users {
                id
                name
                username
                email
                city
                state
                Profile {
                    image
                    bio
                }
                invited
            }
            error
            __typename
        }
    }
`
