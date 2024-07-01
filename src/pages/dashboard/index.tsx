import { useMemo, useState } from 'react'
import { useData } from './useData';
import Item from './Item';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';


function DashboardPage() {

    const [year, setYear] = useState(Number(new Date().getFullYear()));

    const { reviewFetching, reviewStat, totalStat } = useData(year);

    const data = useMemo(() => {
        if (reviewFetching) return;
        return reviewStat?.map(item => ({
            name: item?.month?.substring(0, 7),
            total: item.totalReviews,
        }))
    }, [reviewFetching])

    return (
        <>
            <div className='grid grid-cols-2 lg:grid-cols-5 gap-5'>
                <Item title='Tổng nhà trọ' value={totalStat?.totalAsset || 0} />
                <Item title='Tổng chứng chỉ' value={totalStat?.totalCertification || 0} />
                <Item title='Tổng người theo dõi' value={totalStat?.totalFollower || 0} />
                <Item title='Tổng bài viết' value={totalStat?.totalPost || 0} />
                <Item title='Tổng đánh giá' value={totalStat?.totalReview || 0} />
            </div>

            <div className='flex justify-between mt-10'>
                <h1 className="text-xl font-bold">Thống kê số lượng đánh giá</h1>
                <Select value={year.toString()} onValueChange={(value) => setYear(Number(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Years</SelectLabel>
                            {Array.from({ length: 41 }, (_, i) => 1990 + i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {!reviewFetching &&
                <>

                    <div className='mt-5 bg-white rounded-lg shadow-md pt-10 p-5'>
                        <ResponsiveContainer width={"100%"} height={500}>
                            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </>
            }
        </>
    )
}

export default DashboardPage;
