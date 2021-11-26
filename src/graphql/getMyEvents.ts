import { gql } from '@urql/core'

export const GET_MY_EVENTS = gql`
    query GetMyEvents {
        getMyEvents {
            events {
                id
                userId
                eventName
                timeStart
                timeEnd
                venue
                description
                interest
                organizer
            }
            error
        }
    }
`
