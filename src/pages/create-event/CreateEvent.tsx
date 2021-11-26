import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { useMutation } from 'urql'
import { Input } from '../../components/input/Input'
import { AppContext, AppContextType } from '../../context/AppContext'
import { CREATE_EVENT } from '../../graphql/createEvent'
import { pushToEventCreated } from '../../helpers/pushTo'

interface EventFormData {
    eventName: string
    date: any
    timeStart: any
    timeEnd: any
    venue: string
    description: string
}

interface CreateEventInput extends EventFormData {
    interest: string
}

export function CreateEvent() {
    const router = useHistory()
    const appContext = useContext<AppContextType>(AppContext)

    const [alertMsg, setAlertMsg] = useState<string>('')

    const [eventForm, setEventForm] = useState<EventFormData>(
        {} as EventFormData,
    )
    const [, createEvent] = useMutation<any, CreateEventInput>(CREATE_EVENT)

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target
        setEventForm((ef) => ({ ...ef, [name]: value }))
    }

    async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (appContext.selectedInterest) {
            if (
                eventForm.eventName &&
                eventForm.date &&
                eventForm.description &&
                eventForm.timeEnd &&
                eventForm.timeStart &&
                eventForm.venue
            ) {
                const res = await createEvent(
                    {
                        ...eventForm,
                        interest: appContext.selectedInterest,
                    },
                    { additionalTypenames: ['GetEventsResponse'] },
                )
                console.log(res)

                if (res.data) {
                    pushToEventCreated(router)
                } else {
                    setAlertMsg('Please check the entered information')
                }
            } else {
                setAlertMsg('Please check the entered information')
            }
        }
    }

    useEffect(() => {
        if (!appContext.selectedInterest) {
            router.push('/host-event')
        }
        // eslint-disable-next-line
    }, [appContext.selectedInterest])

    return (
        <div className='h-full'>
            <div style={{ height: 50 }}></div>
            <div
                className='bg-white bg-opacity-10 flex items-center flex-col pt-8'
                style={{ width: '100%' }}
            >
                <h1 className='text-3xl font-bold my-4'>Host an event</h1>
                <div className='w-80'>
                    <p className='mb-3'>
                        Interest: {appContext.selectedInterest}
                    </p>

                    <form onSubmit={onSubmitHandler}>
                        {alertMsg !== '' && (
                            <div className='text-center font-bold text-red-600 bg-red-100 rounded p-2 my-2'>
                                {alertMsg}
                            </div>
                        )}
                        <div className='mb-3'>
                            <Input
                                fieldName='Event Name'
                                name='eventName'
                                onChange={onChangeHandler}
                                value={eventForm.eventName}
                            />
                        </div>
                        <div className='mb-3'>
                            <Input
                                fieldName='Date'
                                name='date'
                                type='date'
                                onChange={onChangeHandler}
                                value={eventForm.date}
                            />
                        </div>
                        <div className='flex justify-between mb-3'>
                            <Input
                                fieldName='Time Start'
                                name='timeStart'
                                type='time'
                                onChange={onChangeHandler}
                                value={eventForm.timeStart}
                            />
                            <Input
                                fieldName='Time End'
                                name='timeEnd'
                                type='time'
                                onChange={onChangeHandler}
                                value={eventForm.timeEnd}
                            />
                        </div>
                        <div className='mb-3'>
                            <Input
                                fieldName='Venue'
                                name='venue'
                                onChange={onChangeHandler}
                                value={eventForm.venue}
                            />
                        </div>
                        <div className='mb-3'>
                            <Input
                                fieldName='Description'
                                name='description'
                                onChange={onChangeHandler}
                                value={eventForm.description}
                            />
                        </div>

                        <input
                            type='submit'
                            value='Create Event'
                            className='w-full py-2 rounded-sm mt-4'
                            style={{
                                background:
                                    'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                                boxShadow:
                                    '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}
