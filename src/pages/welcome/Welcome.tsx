import { useHistory } from 'react-router'

export function Welcome() {
    const router = useHistory()
    return (
        <div className='text-center text-grey1'>
            <div style={{ height: 70 }}></div>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Welcome, to Artistry</h1>
                <p className='text-grey1'>
                    Please login/ register to host and join events
                </p>

                <button
                    onClick={() => router.push('/register')}
                    className='py-2 rounded-sm mt-4 px-4'
                    style={{
                        background:
                            'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                        boxShadow:
                            '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                    }}
                >
                    Create new account
                </button>
            </div>
        </div>
    )
}
