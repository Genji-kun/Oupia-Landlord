export interface IAsset {
    id: number,
    userId: number,

    assetName: string,
    assetDescription: string,
    assetType: string,
    assetSlug: string,

    maxPeople: number,
    price: number,
    area: number

    fullLocation: string,
    locationLat: number,
    locationLong: number

    score: number | null

    images: string[],

    createdAt: Date,
    isDeleted: boolean,

}