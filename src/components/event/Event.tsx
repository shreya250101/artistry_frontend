import { useContext } from 'react'
import { useMutation } from 'urql'
import { AppContext, AppContextType } from '../../context/AppContext'
import { DELETE_EVENT } from '../../graphql/deleteEvent'
import { JOIN_EVENT } from '../../graphql/joinEvent'
import { Event as EventType } from '../../types'
import { InviteList } from '../invite-list/InviteList'
import Portal from '../portal/Portal'

interface EventProps {
    event: EventType
    isHostedByMe: boolean
}

export function Event({ event, isHostedByMe: notHostedByMe }: EventProps) {
    const [, joinEvent] = useMutation<any, { event: number }>(JOIN_EVENT)
    const [, cancelEvent] = useMutation<any, { event: number }>(DELETE_EVENT)
    const appContext = useContext<AppContextType>(AppContext)

    async function handleEventClick() {
        if (notHostedByMe) {
            await joinEvent(
                { event: parseInt(event.id as unknown as string) },
                {
                    additionalTypenames: [
                        'GetEventsResponseJoined',
                        'GetProfileResponse',
                    ],
                },
            )
        } else {
            appContext.setEvent(event.id)
            appContext.openInviteList()
        }
    }

    return (
        <div className='mb-5 w-full max-w-sm lg:mb-10 lg:w-event-base text-grey1'>
            <p className='text-base sm:text-lg'>{event.date}</p>
            <h1 className='text-xl lg:text-3xl font-bold underline'>
                {event.eventName}
            </h1>
            <div className='flex flex-col text-sm sm:text-base lg:text-lg my-1'>
                <p>Organizer: {event.organizer}</p>
                <p>
                    {event.timeStart} - {event.timeEnd}
                </p>
                <p className='ml-1'>@ {event.venue}</p>
            </div>
            <p>{event.description}</p>

            <button
                className={`${
                    notHostedByMe ? 'bg-blue' : 'bg-purple'
                } px-5 py-1 rounded-md my-2`}
                onClick={handleEventClick}
            >
                {!notHostedByMe
                    ? 'Invite People'
                    : event.joined
                    ? 'Cancel'
                    : 'Join Event'}
            </button>
            {!notHostedByMe && (
                <button
                    className='ml-2 px-5 py-1 rounded-md my-2 bg-red-300'
                    onClick={async () =>
                        await cancelEvent(
                            { event: parseInt(event.id.toString()) },
                            {
                                additionalTypenames: [
                                    'UserResponse',
                                    'GetProfileResponse',
                                    'GetEventsResponseJoined',
                                    'GetUsersByNameResponse',
                                    'GetInvitesResponse',
                                    'GetEventsResponse',
                                    'GetUsersInMyCityResponse',
                                ],
                            },
                        )
                    }
                >
                    Cancel Event
                </button>
            )}

            {appContext.showInviteList && (
                <Portal selector='backdrop'>
                    <div
                        className={`absolute w-full h-screen left-0 right-0 z-30 bg-opacity-60 bg-grey1 flex justify-center items-center`}
                        onClick={() => appContext.closeInviteList()}
                        style={{ top: window.scrollY }}
                    >
                        <InviteList />
                    </div>
                </Portal>
            )}
        </div>
    )
}
