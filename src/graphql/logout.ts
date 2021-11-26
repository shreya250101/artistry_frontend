import { gql } from '@urql/core'

export const LOGOUT = gql`
    mutation Logout {
        logout {
            status
            error
        }
    }
`
