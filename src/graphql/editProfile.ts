import { gql } from '@urql/core'

export const EDIT_PROFILE = gql`
    mutation EditProfile($name: String, $bio: String, $image: String) {
        editProfile(name: $name, bio: $bio, image: $image) {
            status
            error
        }
    }
`
