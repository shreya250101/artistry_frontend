import { gql } from '@urql/core'

export const SEND_INVITE = gql`
    mutation SendInvite($to: Int!, $event: Int!) {
        sendInvite(to: $to, event: $event) {
            status
            error
        }
    }
`
