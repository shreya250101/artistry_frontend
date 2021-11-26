import { useMutation, useQuery } from 'urql'
import { SpinningWheel } from '../../components/spinning-wheel/SpinningWheel'
import { ACCEPT_INVITE } from '../../graphql/acceptInvite'
import { GET_INVITES } from '../../graphql/getInvites'
import { InviteType } from '../../types'
import useClipboard from 'react-use-clipboard'

interface GetInvitesQuery {
    getInvites: {
        invites: Array<InviteType>
    }
}

export function Invites() {
    const [{ data, fetching }] = useQuery<GetInvitesQuery>({
        query: GET_INVITES,
    })

    const [isCopied, setCopied] = useClipboard(
        'http://localhost:3000/welcome',
        { successDuration: 2000 },
    )

    const [, acceptInvite] = useMutation<any, { invite: number }>(ACCEPT_INVITE)

    return (
        <div className='h-full'>
            <div style={{ height: 50 }}></div>
            <div
                className='bg-white bg-opacity-10 flex items-center flex-col pt-8'
                style={{ width: '100%' }}
            >
                <h1 className='text-3xl font-bold my-4'>Invites</h1>
                <div className='border-b-2 w-10/12 flex justify-end'>
                    <button
                        className='bg-orange py-1 px-3 rounded-md my-3'
                        onClick={setCopied}
                    >
                        {isCopied
                            ? 'Invite link copied'
                            : 'Invite people to Artistry'}
                    </button>
                </div>
                {!fetching ? (
                    <div className='grid grid-cols-1 gap-20 mt-5 px-7 s-800:grid-cols-2 pb-14'>
                        {(data ? data.getInvites.invites : []).map(
                            (invite, idx) => (
                                <div
                                    key={idx}
                                    className='border-2 border-grey2 rounded-md flex flex-col p-4'
                                    style={{ minWidth: 300 }}
                                >
                                    <div className='flex items-center'>
                                        <img
                                            src={invite.fromUser.Profile?.image}
                                            alt='user'
                                            className='bg-grey3 mr-3 rounded-full'
                                            style={{
                                                width: 60,
                                                height: 60,
                                            }}
                                        />
                                        <div>
                                            <p className='font-bold'>
                                                {invite.event.eventName}
                                            </p>
                                            <p className='text-grey1'>
                                                {invite.event.organizer}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='my-2 text-grey1'>
                                        <p className='font-bold'>
                                            Interest: {invite.event.interest}
                                        </p>
                                        <p>{invite.event.description}</p>
                                    </div>
                                    <div>
                                        <button
                                            className='bg-purple py-1 px-3 rounded-md'
                                            onClick={async () => {
                                                await acceptInvite(
                                                    {
                                                        invite: parseInt(
                                                            invite.id,
                                                        ),
                                                    },
                                                    {
                                                        additionalTypenames: [
                                                            'GetInvitesResponse',
                                                        ],
                                                    },
                                                )
                                            }}
                                        >
                                            {!invite.status
                                                ? 'Accept Invite'
                                                : 'Accepted'}
                                        </button>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                ) : (
                    <SpinningWheel />
                )}
            </div>
        </div>
    )
}
