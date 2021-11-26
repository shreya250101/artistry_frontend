import { Fragment, useCallback, useEffect, useState } from 'react'
import {
    RouteComponentProps,
    StaticContext,
    useHistory,
    useLocation,
} from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { useQuery } from 'urql'
import { Navbar } from './components/navbar/Navbar'
import { ME } from './graphql/me'
import { CreateEvent } from './pages/create-event/CreateEvent'
import { EventCreated } from './pages/event-created/EventCreated'
import { Events } from './pages/events/Events'
import { Home } from './pages/home/Home'
import { Invites } from './pages/invites/Invites'
import { Login } from './pages/login/Login'
import { Profile } from './pages/profile/Profile'
import { Register } from './pages/register/Register'
import { Welcome } from './pages/welcome/Welcome'

interface PrivateRouteProps {
    exact: boolean
    path: string
    component:
        | React.ComponentType<any>
        | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>
}

function PrivateRoute({ component, exact, path }: PrivateRouteProps) {
    const [userResponse] = useQuery({ query: ME })
    const router = useHistory()

    useEffect(() => {
        if (
            userResponse.data &&
            userResponse.data.me &&
            !userResponse.data.me.user
        ) {
            router.push('/login')
        }
        // eslint-disable-next-line
    }, [userResponse.fetching])

    return (
        <Fragment>
            {!userResponse.fetching && (
                <Fragment>
                    {userResponse.data.me.user &&
                    userResponse.data.me.user.id !== null ? (
                        <Route exact path={path} component={component} />
                    ) : (
                        <div className='mt-32 text-center'>
                            You are not logged in
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export function FourOFourNotFound() {
    return (
        <div className='text-center text-grey1'>
            <div style={{ height: 70 }}></div>
            <h1 className='font-bold text-2xl my-10'>
                Oops!, The page you are looking for does not exist
            </h1>
        </div>
    )
}

function App() {
    const location = useLocation()
    const [show, setShow] = useState<boolean>(false)
    const authRoutes = useCallback(() => ['/login', '/register'], [])

    useEffect(() => {
        setShow(!authRoutes().includes(location.pathname))
    }, [location.pathname, authRoutes])

    return (
        <div className='App'>
            {show && <Navbar />}
            <Switch>
                <Route exact path='/host-event' component={Home} />
                <PrivateRoute exact path='/' component={Profile} />
                <PrivateRoute
                    exact
                    path='/create-event'
                    component={CreateEvent}
                />
                <Route exact path='/events' component={Events} />
                <PrivateRoute exact path='/invites' component={Invites} />
                <PrivateRoute
                    exact
                    path='/event-created'
                    component={EventCreated}
                />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/welcome' component={Welcome} />
                <Route path='/:anything' component={FourOFourNotFound} />
            </Switch>
        </div>
    )
}

export default App
