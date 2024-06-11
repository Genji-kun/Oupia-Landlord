import { z } from "zod"
import { AssetType } from "../enums"

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})


export const createAssetSchema = z.object({
    assetName: z.string({
        required_error: "Tên nhà trọ không được để trống"
    }).min(6, {
        message: "Tên nhà trọ phải ít nhất 6 ký tự"
    }),
    assetDescription: z.string({
        required_error: "Nội dung mô tả không được để trống"
    }).min(20, {
        message: "Nội dung mô tả phải ít nhất 20 ký tự"
    }),
    assetType: z.enum([AssetType.APARTMENT, AssetType.BOARDING_HOUSE, AssetType.DORMIROTY, AssetType.ENTIRE_HOUSE, AssetType.SHARED_HOUSING_SYSTEM, AssetType.STUDIO_APARTMENT], {
        required_error: "Loại nhà trọ không được để trống",
        invalid_type_error: "Loại nhà trọ không hợp lệ"
    })
})

export const createCertificationSchema = z.object({
    userId: z.number({
        required_error: "Chưa chọn người thuê trọ",
    }),
    assetId: z.number({
        required_error: "Chưa chọn thông tin nhà trọ"
    }),
    startDate: z.date({
        required_error: "Chưa chọn ngày bắt đầu của chứng chỉ"
    })
})