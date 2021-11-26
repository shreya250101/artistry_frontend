import { useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation, useQuery } from 'urql'
import { EditProfile } from '../../components/edit-profile/EditProfile'
import Portal from '../../components/portal/Portal'
import { GET_PROFILE } from '../../graphql/getProfile'
import { LOGOUT } from '../../graphql/logout'

interface ProfileProps {
    image: string
    name: string
    bio: string
    eventsHosted: number
    eventsAttended: number
}

export function Profile() {
    const [{ data, fetching }] = useQuery<{
        getProfile: { profile: ProfileProps; error: string | null }
    }>({ query: GET_PROFILE })
    const [, logout] = useMutation(LOGOUT)

    const [showEditModal, setShowEditModal] = useState<boolean>(false)
    const router = useHistory()

    return (
        <div className='h-full text-center text-grey1'>
            <div style={{ height: 50 }}></div>
            <div
                className='bg-white bg-opacity-10 flex items-center flex-col pt-8'
                style={{ width: '100%' }}
            >
                <div className='text-center'>
                    <div
                        className={`${
                            fetching ? 'animate-pulse bg-gray-300' : ''
                        } m-2 rounded-full`}
                    >
                        {fetching && (
                            <div
                                className=''
                                style={{ height: 120, width: 120 }}
                            ></div>
                        )}
                        {!fetching &&
                            data &&
                            data.getProfile &&
                            data.getProfile.profile.image !== null && (
                                <div
                                    style={{ width: 120, height: 120 }}
                                    className='bg-grey1 m-auto mb-3 rounded-full'
                                >
                                    <img
                                        src={data.getProfile.profile.image}
                                        alt=''
                                        style={{
                                            width: 120,
                                            height: 120,
                                            objectFit: 'fill',
                                        }}
                                        className='rounded-full m-auto'
                                    />
                                </div>
                            )}
                    </div>

                    <div
                        className={`${
                            fetching ? 'animate-pulse bg-gray-300' : ''
                        } my-2 rounded`}
                    >
                        <p className='font-bold h-4'>
                            {!fetching && data && data.getProfile.profile.name}
                        </p>
                    </div>
                    <div
                        className={`${
                            fetching ? 'animate-pulse bg-gray-300' : ''
                        } my-2 rounded`}
                    >
                        {fetching && <div className='h-4'></div>}
                        {!fetching &&
                            data &&
                            !['', ' '].includes(
                                data.getProfile.profile.bio,
                            ) && (
                                <p className='font-bold h-4'>
                                    {data.getProfile.profile.bio}
                                </p>
                            )}
                    </div>
                </div>
                <div className='flex'>
                    <div
                        className={`${
                            fetching ? 'animate-pulse bg-gray-300' : ''
                        } my-2 rounded mx-2`}
                    >
                        {fetching && <div className='h-5 w-36'></div>}
                        {!fetching &&
                            data &&
                            data.getProfile.profile.eventsHosted !== null && (
                                <p className='h-4'>
                                    Events Hosted:{' '}
                                    {data.getProfile.profile.eventsHosted}
                                </p>
                            )}
                    </div>
                    <div
                        className={`${
                            fetching ? 'animate-pulse bg-gray-300' : ''
                        } my-2 rounded mx-2`}
                    >
                        {fetching && <div className='h-5 w-36'></div>}
                        {!fetching &&
                            data &&
                            data.getProfile.profile.eventsAttended !== null && (
                                <p className='h-4'>
                                    Events Attended:{' '}
                                    {data.getProfile.profile.eventsAttended}
                                </p>
                            )}
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setShowEditModal((b) => !b)}
                        className='w-40 py-2 rounded-sm mt-4 mx-2'
                        style={{
                            background:
                                'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                            boxShadow:
                                '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={async () => {
                            await logout(
                                {},
                                { additionalTypenames: ['UserResponse'] },
                            )
                            router.push('/login')
                        }}
                        className='w-40 py-2 rounded-sm mt-4 mx-2'
                        style={{
                            background:
                                'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                            boxShadow:
                                '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
            {showEditModal && !fetching && data && data.getProfile && (
                <Portal selector='backdrop'>
                    <div
                        className={`absolute w-full h-screen left-0 right-0 z-30 bg-opacity-60 bg-grey1 flex justify-center items-center`}
                        onClick={() => setShowEditModal(false)}
                        style={{ top: window.scrollY }}
                    >
                        <EditProfile
                            bio={data.getProfile.profile.bio}
                            name={data.getProfile.profile.name}
                            closeModal={() => setShowEditModal(false)}
                        />
                    </div>
                </Portal>
            )}
        </div>
    )
}
