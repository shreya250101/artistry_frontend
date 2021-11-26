import create from 'zustand'

interface AppGlobalState {
    visible: string
    setVisibleSection: (section: string) => void
}

export const useStore = create<AppGlobalState>((set) => ({
    visible: '',
    setVisibleSection: (section: string) => set(() => ({ visible: section })),
}))
