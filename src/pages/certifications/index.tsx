import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const CertificationsPage: React.FC = () => {



    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-between">
                <h1 className="font-semibold uppercase">Chứng chỉ thuê trọ</h1>
                <div className="flex items-center gap-2">
                    <div className="relative xl:w-96">
                        <Search className="w-4 h-4 absolute z-10 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            className="h-fit w-full placeholder:text-muted-foreground pl-8"
                            placeholder='Nhập từ khóa...'
                        />
                    </div>
                    <Link to="/certifications/create">
                        <Button className="w-fit h-fit bg-primary-500 hover:bg-primary-500/90 px-4">Thêm chứng chỉ</Button>
                    </Link>
                </div>

            </div>
            {/* {
                isFetchingAssets ? <Spinner marginY={"10rem"} /> : <AssetTable data={assets} />
            } */}
        </div>
    )
}

export default CertificationsPage;
