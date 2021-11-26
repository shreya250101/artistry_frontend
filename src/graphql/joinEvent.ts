import { gql } from '@urql/core'

export const JOIN_EVENT = gql`
    mutation JoinEvent($event: Int!) {
        joinEvent(event: $event) {
            status
            error
            __typename
        }
    }
`
