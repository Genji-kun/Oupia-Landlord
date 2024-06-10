import CreateAssetForm from "@/components/pages/assets/create/CreateAssetForm";
import React from "react"

const CreateAssetPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full text-center">
                <h1 className="font-semibold uppercase text-lg">Thêm nhà trọ mới</h1>
                <h3 className="text-muted-foreground text-sm">Thông tin nhà trọ của bạn sẽ được hiển thị trên trang tìm thuê</h3>
            </div>
            <CreateAssetForm />
        </div>
    )
}

export default CreateAssetPage;