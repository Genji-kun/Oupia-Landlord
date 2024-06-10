import Spinner from '@/components/common/Spinner';
import AssetTable from '@/components/pages/AssetManagement/AssetList';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchAssets } from '@/hooks/query';
import { Loader2, Search } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';

const AssetsPage: React.FC = () => {

    const { assets, isFetchingAssets } = useSearchAssets("");

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-between">
                <h1 className="font-semibold uppercase">Nhà trọ của tôi</h1>
                <div className="flex items-center gap-2">
                    <div className="relative xl:w-96">
                        <Search className="w-4 h-4 absolute z-10 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            className="h-fit w-full placeholder:text-muted-foreground pl-8"
                            placeholder='Nhập từ khóa...'
                        />
                    </div>
                    <Link to="/assets/create">
                        <Button className="w-fit h-fit bg-primary-500 hover:bg-primary-500/90 px-4">Thêm nhà trọ</Button>
                    </Link>
                </div>

            </div>
            {
                isFetchingAssets ? <Spinner marginY={"10rem"} /> : <AssetTable data={assets} />
            }
        </div>
    )
}

export default AssetsPage;
