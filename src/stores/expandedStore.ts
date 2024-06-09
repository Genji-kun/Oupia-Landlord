import { TExpandedStore } from '@/lib/types'
import { create } from 'zustand'

export const useExpandedStore = create<TExpandedStore>((set) => ({
    expanded: false,
    toggle: () => {
        set((state) => ({ expanded: !state.expanded }))
    }
}));


