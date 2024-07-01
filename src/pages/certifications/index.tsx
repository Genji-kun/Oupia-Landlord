import FilterInput from '@/components/common/FilterInput';
import CertificationTable from '@/components/pages/certifications/CertificationTable';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useSearchCertifications } from '@/hooks/query';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon, Search } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const CertificationsPage: React.FC = () => {

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);

    const { certifications, isFetchingCertifications, totalElements, totalPage } = useSearchCertifications(size, page);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-between">
                <h1 className="font-semibold uppercase">Chứng chỉ thuê trọ</h1>
                <div className="flex items-center gap-2">
                    <div className="relative xl:w-96">
                        <Search className="w-4 h-4 absolute z-10 left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <FilterInput
                            keyParam='s'
                            className="h-fit w-full placeholder:text-muted-foreground pl-8"
                            placeholder='Nhập từ khóa...'
                        />
                    </div>
                    <Link to="/certifications/create">
                        <Button className="w-fit h-fit bg-primary-500 hover:bg-primary-500/90 px-4">Thêm chứng chỉ</Button>
                    </Link>
                </div>

            </div>

            {
                isFetchingCertifications ? <Skeleton className="bg-border w-full aspect-[4/1]" /> : <CertificationTable data={certifications} />
            }
            <div className="flex justify-between gap-2 items-center">
                {totalElements > 0}
                <div className='flex items-center justify-center gap-2'>
                    <Button disabled={page <= 1} onClick={() => setPage(1)} variant={"outline"} className='h-fit w-fit p-2'>
                        <ChevronFirstIcon className='w-4 h-4' />
                    </Button>
                    <Button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)} variant={"outline"} className='h-fit w-fit p-2'>
                        <ChevronLeftIcon className='w-4 h-4' />
                    </Button>
                    <Button variant={"ghost"} className='h-fit w-fit p-2'>
                        <span className='font-bold'>{page}</span>
                    </Button>
                    <Button disabled={page >= totalPage} onClick={() => setPage((prev) => prev + 1)} variant={"outline"} className='h-fit w-fit p-2'>
                        <ChevronRightIcon className=' w-4 h-4' />
                    </Button>
                    <Button disabled={page >= totalPage} onClick={() => setPage((prev) => prev + 1)} variant={"outline"} className='h-fit w-fit p-2'>
                        <ChevronLastIcon className=' w-4 h-4' />
                    </Button>
                </div>
                <div className='flex gap-2 items-center'>
                    <h3 className='font-semibold text-foreground'>Hiển thị số lượng hàng</h3>
                    <Select value={size.toString()} onValueChange={(value) => setSize(Number(value))}>
                        <SelectTrigger className="w-16">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Số hàng</SelectLabel>
                                {
                                    [2, 4, 6, 8, 10].map((item, index) => {
                                        return <SelectItem key={index} value={item.toString()}>{item}</SelectItem>
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>
        </div>
    )
}

export default CertificationsPage;
