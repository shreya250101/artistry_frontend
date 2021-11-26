import { gql } from '@urql/core'

export const DELETE_EVENT = gql`
    mutation DeleteEvent($event: Int!) {
        deleteEvent(event: $event) {
            status
            error
        }
    }
`
