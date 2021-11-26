import { useContext } from 'react'
import Cooking from '../../assets/cooking.png'
import Music from '../../assets/music.png'
import Painting from '../../assets/painting.png'
import Pottery from '../../assets/pottery.png'
import SocialWork from '../../assets/social-work.png'
import { InterestCard } from '../../components/interest-card/InterestCard'
import {
    AppContext,
    AppContextType,
    AppStateType,
} from '../../context/AppContext'

// interface HomeProps {}

interface Interest {
    name: string
    color: string
    image: string
    id: AppStateType['selectedInterest']
}

export function Home() {
    const appContext = useContext<AppContextType>(AppContext)

    // const [selectedInterest, setSelectedInterest] = useState<string>('')

    const interests: Array<Interest> = [
        { name: 'Painting', color: '#C2E2FF', image: Painting, id: 'painting' },
        {
            name: 'Social Work',
            color: '#FFD1FA',
            image: SocialWork,
            id: 'social_work',
        },
        { name: 'Music', color: '#D2D1FF', image: Music, id: 'music' },
        { name: 'Pottery', color: '#FFD5BE', image: Pottery, id: 'pottery' },
        { name: 'Cooking', color: '#C2E2FF', image: Cooking, id: 'cooking' },
    ]

    return (
        <div className='flex items-center justify-center flex-col'>
            <div style={{ height: 80 }}></div>
            <div className='flex items-center justify-center flex-col'>
                <h1 className='text-2xl font-bold my-4 text-center'>
                    Pick an interest for your event
                </h1>

                <div className='grid grid-cols-2 mt-3'>
                    {interests.map((interest, i) => (
                        <InterestCard
                            key={i}
                            {...interest}
                            onClick={() => {
                                appContext.setInterest(interest.id)
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
