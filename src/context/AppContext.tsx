import React, { createContext, useReducer } from 'react'

export const AppContext = createContext<AppContextType>({} as AppContextType)

export interface AppStateType {
    selectedInterest:
        | 'social_work'
        | 'music'
        | 'painting'
        | 'pottery'
        | 'cooking'
        | null
    showInviteList: boolean
    event: number
}

export interface AppContextType extends AppStateType {
    setInterest: (interest: AppStateType['selectedInterest']) => void
    openInviteList: () => void
    closeInviteList: () => void
    setEvent: (event: number) => void
}

function appReducer(
    state: AppStateType,
    action:
        | { type: 'INTEREST'; payload: AppStateType['selectedInterest'] }
        | { type: 'SHOW_INVITE_LIST' }
        | { type: 'HIDE_INVITE_LIST' }
        | { type: 'SET_EVENT'; payload: number },
): AppStateType {
    switch (action.type) {
        case 'INTEREST':
            return { ...state, selectedInterest: action.payload }
        case 'SHOW_INVITE_LIST':
            return { ...state, showInviteList: true }
        case 'HIDE_INVITE_LIST':
            return { ...state, showInviteList: false }
        case 'SET_EVENT':
            return { ...state, event: action.payload }
        default:
            return state
    }
}

export function AppState({ children }: { children: React.ReactNode }) {
    const initialState: AppStateType = {
        selectedInterest: null,
        showInviteList: false,
        event: 0,
    }

    const [state, dispatch] = useReducer(appReducer, initialState)

    function setInterest(interest: AppStateType['selectedInterest']) {
        dispatch({ type: 'INTEREST', payload: interest })
    }

    function openInviteList() {
        dispatch({ type: 'SHOW_INVITE_LIST' })
    }

    function closeInviteList() {
        dispatch({ type: 'HIDE_INVITE_LIST' })
    }

    function setEvent(event: number) {
        dispatch({ type: 'SET_EVENT', payload: event })
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setInterest,
                openInviteList,
                closeInviteList,
                setEvent,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
