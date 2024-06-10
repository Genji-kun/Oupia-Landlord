import { TCurrentUserStore } from '@/lib/types'
import Cookies from 'js-cookie';
import { create } from 'zustand'

export const useCurrentUserStore = create<TCurrentUserStore>((set) => ({
    currentUser: (() => {
        try {
            const user = Cookies.get("user");
            return user ? JSON.parse(user) : null;
        } catch {
            return null;
        }
    })(),
    signIn: (user) => {
        set(() => ({ currentUser: user }));
    },
    signOut: () => {
        set(() => ({ currentUser: null }));
    }
}));


