import { gql } from '@urql/core'

export const GET_INVITES = gql`
    query GetInvites {
        getInvites {
            invites {
                id
                status
                event {
                    id
                    eventName
                    description
                    interest
                    organizer
                }
                fromUser {
                    Profile {
                        image
                    }
                }
            }
        }
    }
`
