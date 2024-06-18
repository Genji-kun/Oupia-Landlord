import { Status } from "../enums"

export interface ICertification {
    id: number,
    startDate: Date,
    expireDate: Date,
    status: Status,
    assetId: number,
    assetName: string,
    assetAddress: string,
    landlordId: number,
    landlordName: string,
    landlordUsername: string,
    tenantId: number,
    tenantName: string,
    tenantUsername: string,
    haveReviewed: boolean,
    transactionHash: string | null
}