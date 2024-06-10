import { ICurrentUser } from "../interfaces/User"

export type TExpandedStore = {
    expanded: boolean,
    toggle: () => void
}

export type TCurrentUserStore = {
    currentUser: ICurrentUser | null,
    signIn: (user: ICurrentUser) => void,
    signOut: () => void
}

export type TSignInForm = {
    username: string,
    password: string
}

export type TAssetParam = {
    userId: number,
    keyword: string,
    page: number | undefined,
    size: number | undefined
}
