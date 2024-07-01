import { z } from "zod"
import { AssetType } from "../enums"

export const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

const fileArraySchema = z.array(
    z.instanceof(File)
).nonempty({
    message: "Hình ảnh nhà trọ không được để trống"
}).refine(files => files.length >= 3, {
    message: "Hình ảnh nhà trọ cần ít nhất 3 hình ảnh"
});


export const createAssetSchema = z.object({
    assetName: z.string({
        required_error: "Tên nhà trọ không được để trống",
    }).min(1, {
        message: "Tên nhà trọ không được để trống"
    }),
    assetDescription: z.string({
        required_error: "Nội dung mô tả không được để trống",
    }),
    assetType: z.enum([
        AssetType.APARTMENT,
        AssetType.BOARDING_HOUSE,
        AssetType.DORMIROTY,
        AssetType.ENTIRE_HOUSE,
        AssetType.SHARED_HOUSING_SYSTEM,
        AssetType.STUDIO_APARTMENT
    ], {
        required_error: "Loại nhà trọ không được để trống"
    }),
    fullLocation: z.string({
        required_error: "Địa chỉ nhà trọ không được để trống",
    }).min(1, {
        message: "Địa chỉ nhà trọ không được để trống"
    }),
    locationLat: z.number(),
    locationLong: z.number(),
    price: z.string({
        required_error: "Giá thuê nhà trọ không được để trống",
    }).min(1, {
        message: "Giá thuê nhà trọ không được để trống"
    }),
    area: z.string({
        required_error: "Diện tích nhà trọ không được để trống",
    }).min(1, {
        message: "Diện tích nhà trọ không được để trống"
    }),
    maxPeople: z.string({
        required_error: "Số người thuê nhà trọ không được để trống",
    }).min(1, {
        message: "Số người thuê nhà trọ không được để trống"
    }),
    amenities: z.array(z.object({
        amenityName: z.string()
    })).nonempty({
        message: "Tiện ích nhà trọ không để trống"
    }),
    images: fileArraySchema
});

export const createCertificationSchema = z.object({
    userId: z.number({
        required_error: "Chưa chọn người thuê trọ",
    }),
    assetId: z.number({
        required_error: "Chưa chọn thông tin nhà trọ"
    }),
    startDate: z.date({
        required_error: "Chưa chọn ngày bắt đầu của chứng nhận"
    })
})