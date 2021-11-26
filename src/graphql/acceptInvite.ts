import { gql } from '@urql/core'

export const ACCEPT_INVITE = gql`
    mutation AcceptInvite($invite: Int!) {
        acceptInvite(invite: $invite) {
            status
            error
        }
    }
`
