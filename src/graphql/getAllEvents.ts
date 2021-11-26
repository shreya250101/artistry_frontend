import { gql } from 'urql'

export const GET_ALL_EVENTS = gql`
    query GetEvents {
        getEvents {
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
                joined
            }
            error
        }
    }
`
