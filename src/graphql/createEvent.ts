import { gql } from 'urql'

export const CREATE_EVENT = gql`
    mutation CreateEvent(
        $interest: String!
        $eventName: String!
        $timeStart: String!
        $timeEnd: String!
        $venue: String!
        $description: String!
    ) {
        createEvent(
            interest: $interest
            eventName: $eventName
            timeStart: $timeStart
            timeEnd: $timeEnd
            venue: $venue
            description: $description
        ) {
            status
            error
        }
    }
`
