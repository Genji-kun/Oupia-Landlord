import { AssetType } from "../enums"
import { ICurrentUser } from "../interfaces/User"


// Store

export type TExpandedStore = {
    expanded: boolean,
    toggle: () => void
}

export type TCurrentUserStore = {
    currentUser: ICurrentUser | null,
    signIn: (user: ICurrentUser) => void,
    signOut: () => void
}

// Form

export type TSignInForm = {
    username: string,
    password: string
}

export type TCreateAssetForm = {
    assetName: string,
    assetDescription: string,
    assetType: AssetType,

}

// Param

export type TAssetParam = {
    userId: number,
    keyword: string,
    page: number | undefined,
    size: number | undefined
}
