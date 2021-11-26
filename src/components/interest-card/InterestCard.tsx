import { useHistory } from 'react-router'
import { pushToCreateEvent } from '../../helpers/pushTo'

interface InterestCardProps {
    name: string
    color: string
    image: string
    onClick: () => void
}

export function InterestCard({
    color,
    name,
    image,
    onClick,
}: InterestCardProps) {
    const router = useHistory()

    function handleOnClick() {
        onClick()
        pushToCreateEvent(router)
    }

    return (
        <div
            className='w-40 mb-3 px-2 py-2 rounded-md mx-2'
            style={{ backgroundColor: color }}
            onClick={handleOnClick}
        >
            <h1 className='mb-5'>{name}</h1>
            <img src={image} alt='' className='ml-auto w-12' />
        </div>
    )
}
