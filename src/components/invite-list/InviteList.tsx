import { useContext } from 'react'
import { useMutation, useQuery } from 'urql'
import { AppContext, AppContextType } from '../../context/AppContext'
import { GET_USERS_IN_MY_CITY } from '../../graphql/getUsersInMyCity'
import { SEND_INVITE } from '../../graphql/sendInvite'
import { SpinningWheel } from '../spinning-wheel/SpinningWheel'

// interface InviteListProps {}

export function InviteList() {
    const { event } = useContext<AppContextType>(AppContext)
    const [{ data, fetching }] = useQuery<{
        getUsersInMyCity: {
            users: Array<{
                id: number
                name: string
                Profile: { image: string; bio: string }
                bio: string
                invited: boolean
            }>
        }
    }>({
        query: GET_USERS_IN_MY_CITY,
        variables: { event: parseInt(event as unknown as string) },
    })

    const [, sendInvite] = useMutation<any, { to: number; event: number }>(
        SEND_INVITE,
    )

    return (
        <div
            className='bg-white p-4 rounded flex flex-col justify-center items-center'
            onClick={(e) => e.stopPropagation()}
        >
            <h2 className='font-bold text-xl mb-3'>Invite People</h2>
            {!fetching &&
                data &&
                data.getUsersInMyCity &&
                data.getUsersInMyCity.users.length === 0 && (
                    <div className='w-72 text-center'>No users nearby</div>
                )}
            {fetching ? (
                <SpinningWheel />
            ) : (
                <div className='overflow-y-scroll' style={{ maxHeight: 800 }}>
                    {data &&
                        data.getUsersInMyCity &&
                        data.getUsersInMyCity.users.map((user) => (
                            <div
                                key={user.id}
                                className='p-4 bg-gray-100 lg:w-96 flex justify-between'
                                style={{ minWidth: 300 }}
                            >
                                <div className='flex'>
                                    <div className='mr-3'>
                                        <img
                                            src={user.Profile.image}
                                            alt=''
                                            className='rounded-full'
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </div>
                                    <div>
                                        <p className='font-bold text-grey1'>
                                            {user.name}
                                        </p>
                                        <p className='text-grey1 text-sm'>
                                            {user.Profile.bio}
                                        </p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <button
                                        className='w-full py-2 rounded-sm px-4'
                                        style={{
                                            background: `${
                                                user.invited
                                                    ? 'white'
                                                    : 'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)'
                                            }`,
                                            boxShadow:
                                                '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                                        }}
                                        onClick={async () =>
                                            await sendInvite(
                                                {
                                                    to: parseInt(
                                                        user.id as unknown as string,
                                                    ),
                                                    event: parseInt(
                                                        event as unknown as string,
                                                    ),
                                                },
                                                {
                                                    additionalTypenames: [
                                                        'GetUsersInMyCityResponse',
                                                    ],
                                                },
                                            )
                                        }
                                    >
                                        {user.invited ? 'Cancel' : 'Invite'}
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    )
}
