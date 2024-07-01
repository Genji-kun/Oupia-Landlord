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
    price: string,
    area: string,
    fullLocation: string,
    maxPeople: string,
    locationLong: number,
    locationLat: number,
    amenities: Amenity[],
    images: File[]
}

export type Amenity = {
    amenityName: string
}

export type TCreateCertificationForm = {
    assetId: number,
    userId: number,
    startDate: Date
}

// Param

export type TAssetParam = {
    userId: number,
    keyword: string,
    page: number | undefined,
    size: number | undefined
}

export type TCertificationParam = {
    assetId: number | undefined,
    userId: number | undefined,
    keywordByAsset: string,
    keywordByUser: string,
    page: number | undefined,
    size: number | undefined
}


export type TUserParam = {
    keyword: string,
    page: number | undefined,
    size: number | undefined
}

export type TMonthlyReviewParam = {
    start: string;
    end: string;
    assetId?: number;
    userId?: number;
}

