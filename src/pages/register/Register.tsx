import { useEffect, useState } from 'react'
import ArtistryLogo from '../../assets/Icon.svg'
import { Input } from '../../components/input/Input'
import { Link } from 'react-router-dom'
import { useMutation, useQuery } from 'urql'
import { REGISTER } from '../../graphql/register'
import { useHistory } from 'react-router'
import { ME } from '../../graphql/me'

interface RegisterForm {
    name: string
    email: string
    password: string
    state: string
    city: string
}

export function Register() {
    const router = useHistory()
    const [registerForm, setRegisterForm] = useState<RegisterForm>({
        city: '',
        email: '',
        name: '',
        password: '',
        state: '',
    })

    const [alertMsg, setAlertMsg] = useState<string>('')
    const [, registerUser] = useMutation<any, RegisterForm>(REGISTER)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        let { name, value } = e.target
        setRegisterForm((rf) => ({ ...rf, [name]: value }))
    }

    const [userResponse] = useQuery({ query: ME })

    useEffect(() => {
        if (
            userResponse.data &&
            userResponse.data.me &&
            userResponse.data.me.user
        ) {
            router.push('/') // profile page
        }
        // eslint-disable-next-line
    }, [userResponse.fetching])

    function dataIsValid() {
        let valid = true
        if (
            !registerForm.name ||
            (registerForm.name && registerForm.name.length < 2)
        ) {
            setAlertMsg('Please check the entered name')
            valid = false
        } else if (
            !registerForm.email ||
            (registerForm.email && registerForm.email.length < 2)
        ) {
            setAlertMsg('Please check the entered email')
            valid = false
        } else if (
            !registerForm.state ||
            (registerForm.state && registerForm.state.length < 2)
        ) {
            setAlertMsg('Please check the entered state')
            valid = false
        } else if (
            !registerForm.password ||
            (registerForm.password && registerForm.password.length < 8)
        ) {
            setAlertMsg('Password must contain at-least 8 characters')
            valid = false
        } else if (
            !registerForm.city ||
            (registerForm.city && registerForm.city.length < 2)
        ) {
            setAlertMsg('Please check the entered city')
            valid = false
        }

        return valid
    }

    return (
        <div className='flex justify-center items-center text-grey1 flex-col h-screen'>
            <div className='text-center'>
                <div className='flex items-center justify-center'>
                    <img
                        src={ArtistryLogo}
                        alt=''
                        style={{ width: 50 }}
                        className='mr-2'
                    />
                    <p className='font-bold text-xl'>Artistry</p>
                </div>
                <p className='mt-3'>A brief description about artistry</p>
            </div>
            <form
                className='my-3 w-80'
                onSubmit={async (e) => {
                    e.preventDefault()
                    if (dataIsValid()) {
                        const res = await registerUser(
                            { ...registerForm },
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
                        if (
                            res &&
                            res.data &&
                            res.data.register.error &&
                            res.data.register.error.length > 3
                        ) {
                            setAlertMsg(res.data.register.error)
                        } else if (
                            res.data &&
                            res.data.register &&
                            res.data.register.user.id
                        ) {
                            router.push('/')
                        }
                    }
                }}
            >
                <div className='mb-1'>
                    {alertMsg !== '' && (
                        <div className='text-center font-bold text-red-600 bg-red-100 rounded p-2 my-2'>
                            {alertMsg}
                        </div>
                    )}
                    <Input
                        fieldName='Name'
                        name='name'
                        onChange={handleChange}
                        value={registerForm.name}
                    />
                </div>
                <div className='mb-1'>
                    <Input
                        fieldName='Email'
                        name='email'
                        type='email'
                        onChange={handleChange}
                        value={registerForm.email}
                    />
                </div>
                <div className='mb-1'>
                    <Input
                        fieldName='Password'
                        name='password'
                        type='password'
                        onChange={handleChange}
                        value={registerForm.password}
                    />
                </div>
                <div className='mb-1'>
                    <Input
                        fieldName='State'
                        name='state'
                        onChange={handleChange}
                        value={registerForm.state}
                    />
                </div>
                <div className='mb-1'>
                    <Input
                        fieldName='City'
                        name='city'
                        onChange={handleChange}
                        value={registerForm.city}
                    />
                </div>
                <div>
                    <input
                        type='submit'
                        value='Register'
                        className='w-full py-2 rounded-sm mt-4'
                        style={{
                            background:
                                'linear-gradient(90.7deg, rgba(255, 209, 250, 0.92) 5.75%, rgba(194, 226, 255, 0.94) 95.45%)',
                            boxShadow:
                                '4px 4px 4px rgba(0, 0, 0, 0.06), -4px 0px 4px rgba(0, 0, 0, 0.06)',
                        }}
                    />
                </div>
            </form>
            <p>
                Already have an account?{' '}
                <Link to='/login'>
                    <span style={{ color: '#7F7DFF' }}>Sign in</span>
                </Link>
            </p>
        </div>
    )
}
