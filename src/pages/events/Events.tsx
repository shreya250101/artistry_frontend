import { useState } from 'react'
import { useQuery } from 'urql'
import { Event } from '../../components/event/Event'
import { SpinningWheel } from '../../components/spinning-wheel/SpinningWheel'
import { GET_ALL_EVENTS } from '../../graphql/getAllEvents'
import { GET_MY_EVENTS } from '../../graphql/getMyEvents'
import { ME } from '../../graphql/me'
import { Event as EventType } from '../../types'

export function Events() {
    const [upcomingEventsResponse] = useQuery<{
        getEvents: { events: Array<EventType> }
    }>({
        query: GET_ALL_EVENTS,
    })

    const [myEventsResponse] = useQuery<{
        getMyEvents: { events: Array<EventType> }
    }>({ query: GET_MY_EVENTS })

    const [me] = useQuery<{ me: { user: { id: number } } }>({ query: ME })

    const [toggleEvents, setToggleEvents] = useState<boolean>(false)

    function toggle() {
        setToggleEvents((o) => !o)
    }

    return (
        <div className='h-full'>
            <div style={{ height: 50 }}></div>
            <div
                className='bg-white bg-opacity-10 flex items-center flex-col pt-8'
                style={{ width: '100%' }}
            >
                <h1 className='text-3xl font-bold my-4'>
                    {!toggleEvents ? 'Upcoming Events' : 'Your Events'}
                </h1>
                <div className='border-b-2 w-10/12 flex justify-end'>
                    <button
                        className='bg-orange py-1 px-3 rounded-md my-3'
                        onClick={toggle}
                    >
                        {toggleEvents ? 'Upcoming Events' : 'Your Events'}
                    </button>
                </div>
                {upcomingEventsResponse.fetching ||
                myEventsResponse.fetching ||
                me.fetching ? (
                    <SpinningWheel />
                ) : (
                    <div className='grid grid-cols-1 gap-5 mt-5 px-7 s-800:grid-cols-2 pb-14'>
                        {(!toggleEvents
                            ? upcomingEventsResponse.data
                                ? upcomingEventsResponse.data.getEvents.events
                                : []
                            : myEventsResponse.data
                            ? myEventsResponse.data.getMyEvents.events
                            : []
                        ).map((event, idx) => (
                            <Event
                                key={idx}
                                event={event}
                                isHostedByMe={
                                    me.data
                                        ? me.data.me.user.id !== event.userId
                                        : false
                                }
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
