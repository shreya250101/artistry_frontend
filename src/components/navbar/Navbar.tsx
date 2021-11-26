import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import ArtistryIcon from '../../assets/Icon.svg'
import { ME } from '../../graphql/me'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import HamMenu from '../ham-menu/HamMenu'
import Portal from '../portal/Portal'
import styles from './navbar.module.css'

const NavLinksList: React.FC<{
    smallerThan600px?: boolean
    onClick?: () => void
    isLoggedIn: boolean
}> = ({ smallerThan600px = false, onClick, isLoggedIn = false }) => {
    const widerThan800px = useMediaQuery('(min-width: 800px)')

    return (
        <div
            className={`bg-white w-full flex items-center px-10 ${
                smallerThan600px
                    ? 'absolute py-5 bg-gray justify-center'
                    : 'justify-between'
            } ${styles.navLinks}`}
        >
            {widerThan800px && (
                <div
                    className={`flex items-center justify-center ${styles.icon}`}
                >
                    <img
                        src={ArtistryIcon}
                        alt='university'
                        width='50px'
                        height='50px'
                    />
                    <p className='text-xl ml-4 font-bold text-grey1'>
                        Artistry
                    </p>
                </div>
            )}
            <ul
                className={`flex ${
                    smallerThan600px ? 'flex-col items-center' : 'justify-end'
                }`}
            >
                <li
                    onClick={onClick}
                    className={!smallerThan600px ? 'mx-4' : ''}
                >
                    <Link to='/events'>Events</Link>
                </li>
                <li
                    onClick={onClick}
                    className={!smallerThan600px ? 'mx-4' : ''}
                >
                    <Link to='/host-event'>Host Event</Link>
                </li>
                <li
                    onClick={onClick}
                    className={!smallerThan600px ? 'mx-4' : ''}
                >
                    <Link to='/invites'>Invite</Link>
                </li>
                <li
                    onClick={onClick}
                    className={!smallerThan600px ? 'mx-4' : ''}
                >
                    <Link to={isLoggedIn ? '/' : '/login'}>
                        {isLoggedIn ? 'Profile' : 'Login'}
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export function Navbar() {
    const smallerThan600px = useMediaQuery('(max-width: 745px)')
    const [open, setOpen] = useState<boolean>(false)

    const [userResponse] = useQuery({ query: ME })

    function closeNavLinks() {
        setOpen(false)
    }

    function toggleNavbar() {
        setOpen((o) => !o)
    }

    useEffect(() => {
        if (!smallerThan600px) {
            setOpen(false)
        }

        if (open) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'scroll'
        }
    }, [smallerThan600px, open, setOpen])

    return (
        <Fragment>
            {!userResponse.fetching && (
                <Fragment>
                    <div style={{ width: '100%' }}></div>
                    <nav
                        className={` bg-white fixed w-full z-30 top-0 ${
                            smallerThan600px && open
                                ? 'z-20 left-0 right-0 fixed flex justify-end items-center border-b-2 border-accent5'
                                : 'flex justify-end items-center'
                        } ${styles.nav} bg-gray`}
                    >
                        {smallerThan600px && (
                            <div className='px-4 w-full flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <img
                                        src={ArtistryIcon}
                                        alt=''
                                        style={{ width: 40 }}
                                    />
                                    <p className='ml-2'>Artistry</p>
                                </div>
                                <div className='cursor-pointer h-full justify-center items-center mx-3 flex'>
                                    <HamMenu
                                        onClick={toggleNavbar}
                                        open={open}
                                    />
                                </div>
                            </div>
                        )}

                        {smallerThan600px ? (
                            <Fragment>
                                {open ? (
                                    <NavLinksList
                                        smallerThan600px
                                        onClick={closeNavLinks}
                                        isLoggedIn={
                                            userResponse.data.me.user &&
                                            userResponse.data.me.user.id !==
                                                null
                                        }
                                    />
                                ) : (
                                    <Fragment></Fragment>
                                )}
                            </Fragment>
                        ) : (
                            <NavLinksList
                                isLoggedIn={
                                    userResponse.data.me.user &&
                                    userResponse.data.me.user.id !== null
                                }
                            />
                        )}

                        <Portal selector='backdrop'>
                            {open && smallerThan600px && (
                                <div
                                    className={`absolute w-full h-screen bg-gray left-0 right-0 z-10 opacity-60 bg-grey1`}
                                    onClick={closeNavLinks}
                                    style={{ top: window.scrollY }}
                                ></div>
                            )}
                        </Portal>
                    </nav>
                </Fragment>
            )}
        </Fragment>
    )
}
