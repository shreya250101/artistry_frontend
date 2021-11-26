export interface Event {
    date: string
    eventName: string
    timeStart: string
    timeEnd: string
    venue: string
    description: string
    link: string | null
    organizer: string
    id: number
    userId: number
    joined: boolean
}

export interface InviteType {
    id: string
    status: boolean
    event: {
        id: number
        eventName: string
        description: string
        interest: string
        organizer: string
    }
    fromUser: { Profile: { image: string } | null }
}
