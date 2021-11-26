import { useHistory } from 'react-router'

export function EventCreated() {
    const router = useHistory()
    return (
        <div className='my-10 text-center'>
            <div style={{ height: 70 }}></div>
            <h2 className='text-4xl font-bold text-center'>Event Created!</h2>
            <button
                className='w-40 py-2 rounded-sm mt-4'
                style={{
                    background:
                        'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                    boxShadow:
                        '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                }}
                onClick={() => router.push('/')}
            >
                Continue
            </button>
        </div>
    )
}
