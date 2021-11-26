import { gql } from '@urql/core'

export const GET_PROFILE = gql`
    query GetProfile {
        getProfile {
            profile {
                image
                name
                bio
                eventsHosted
                eventsAttended
            }
            error
        }
    }
`
