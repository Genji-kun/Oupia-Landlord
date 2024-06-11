import CreateCertificationForm from '@/components/pages/certifications/create/CreateCertificationForm';
import React from 'react'

const CreateCertificationPage: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full text-center">
                <h1 className="font-semibold uppercase text-lg">Thêm chứng chỉ cho người thuê</h1>
                <h3 className="text-muted-foreground text-sm">Thông tin chứng chỉ cho phép người dùng bạn yêu cầu được đánh giá nhà trọ và xác thực người dùng đã ở nhà trọ của bạn</h3>
            </div>
            <CreateCertificationForm />
        </div>
    )
}

export default CreateCertificationPage;