import React, { useState } from 'react'
import { Input } from '../input/Input'
import Axios from 'axios'
import { ImageURI } from '../../constants/urls'
import { useMutation } from 'urql'
import { EDIT_PROFILE } from '../../graphql/editProfile'

interface EditProfileProps {
    name: string
    bio: string
}

interface ProfileFormType {
    image: File
    name: string
    bio: string
}

export function EditProfile({
    bio,
    name,
    closeModal,
}: EditProfileProps & { closeModal: () => void }) {
    const [profile, setProfile] = useState<ProfileFormType>({
        bio,
        image: new File([''], ''),
        name,
    } as ProfileFormType)

    const [saving, setSaving] = useState<boolean>(false)

    const [, editProfile] = useMutation<
        any,
        EditProfileProps & { image?: string }
    >(EDIT_PROFILE)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let { value, name } = e.target
        setProfile((p) => ({ ...p, [name]: value }))
    }

    function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setProfile((p) => ({
                ...p,
                image: (e.target.files as FileList)[0],
            }))
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        setSaving(true)
        e.preventDefault()
        let formData = new FormData()
        if (profile.image && profile.image.size !== 0) {
            formData.append('image', profile.image)
            const r = await Axios.post(ImageURI, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            const imageLink = r.data.data.display_url

            await editProfile(
                { bio: profile.bio, name, image: imageLink },
                { additionalTypenames: ['GetProfileResponse'] },
            )
        } else {
            await editProfile(
                { bio: profile.bio, name: profile.name },
                { additionalTypenames: ['GetProfileResponse'] },
            )
        }
        setSaving(false)
        closeModal()
    }

    return (
        <div
            className='bg-white p-4 rounded flex flex-col justify-center items-center'
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className='font-bold text-xl mb-3'>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <Input
                        fieldName='Profile Image'
                        name='image'
                        type='file'
                        onChange={handleChangeFile}
                        disabled={saving}
                    />
                </div>
                <div className='mb-3'>
                    <Input
                        fieldName='Name'
                        name='name'
                        value={profile.name}
                        onChange={handleChange}
                        disabled={saving}
                    />
                </div>
                <div className='mb-3'>
                    <Input
                        fieldName='Bio'
                        name='bio'
                        value={profile.bio}
                        onChange={handleChange}
                        disabled={saving}
                    />
                </div>
                <div>
                    <input
                        disabled={saving}
                        type='submit'
                        value={!saving ? 'Save Changes' : 'Saving...'}
                        className='w-full py-2 rounded-sm mt-4 cursor-pointer disabled:opacity-50'
                        style={{
                            background:
                                'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                            boxShadow:
                                '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                        }}
                    />
                </div>
            </form>
        </div>
    )
}
