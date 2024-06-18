import { IAsset } from "@/lib/interfaces/Asset"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Eye, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Link } from "react-router-dom";

const AssetTable = ({ data }: { data: IAsset[] }) => {
    return (
        <div className="shadow-md rounded-lg overflow-hidden">
            <Table className="bg-background rounded-lg">
                <TableHeader className="uppercase">
                    <TableRow className="bg-primary-500/80 hover:bg-primary-500">
                        <TableHead className="xl:w-96 font-semibold w-80">Thông tin căn hộ</TableHead>
                        <TableHead className="font-semibold w-96">Giới thiệu</TableHead>
                        <TableHead className="font-semibold text-center">Giá thuê</TableHead>
                        <TableHead className="font-semibold text-center">Diện tích</TableHead>
                        <TableHead className="font-semibold text-center">Phân loại</TableHead>
                        <TableHead className="font-semibold">Ngày đăng</TableHead>
                        <TableHead className="w-20"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="rounded-b-lg">
                    {
                        data.length > 0 ? data.map((asset: IAsset) => (
                            <TableRow key={asset.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <img
                                            alt="Asset Image"
                                            src={asset.images[0]}
                                            className="w-16 aspect-square object-cover rounded-lg" />
                                        <span className="font-semibold">{asset.assetName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p className="line-clamp-3">
                                        {asset.assetDescription}
                                    </p>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center justify-center h-full">
                                        {formatCurrency(asset.price)}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center justify-center h-full">
                                        {formatCurrency(asset.area)} m²
                                    </div>
                                </TableCell>
                                <TableCell className="h-full">
                                    <div className="flex items-center justify-center h-full">
                                        {(() => {
                                            let assetType = "";
                                            switch (asset.assetType) {
                                                case "BOARDING_HOUSE":
                                                    assetType = "Dãy trọ";
                                                    break;
                                                case "SHARED_HOUSING_SYSTEM":
                                                    assetType = "Hệ thống nhà chung";
                                                    break;
                                                case "APARTMENT":
                                                    assetType = "Chung cư";
                                                    break;
                                                case "DORMIROTY":
                                                    assetType = "Ký túc xá";
                                                    break;
                                                case "STUDIO_APARTMENT":
                                                    assetType = "Căn hộ mini";
                                                    break;
                                                case "ENTIRE_HOUSE":
                                                    assetType = "Nhà nguyên căn";
                                                    break;
                                                default:
                                                    assetType = "Nhà trọ"
                                            }
                                            return <Badge className="bg-primary-100/50 hover:bg-primary-200 text-primary-500 font-medium border border-primary-500">{assetType}</Badge>
                                        })()}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {format(asset.createdAt, "dd-MM-yyyy")}
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button variant={"ghost"} className="w-fit h-fit p-2 rounded-lg">
                                                <MoreHorizontalIcon className="w-4 h-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent side='top' align='end' className="w-48 flex flex-col p-0">
                                            <Link to={`/assets/detail/${asset.assetSlug}`} className="flex items-center gap-2 py-2 px-4 hover:bg-border dark:hover:bg-oupia-sub cursor-pointer">
                                                <Eye className="w-4 h-4" />
                                                <span className='text-xs'>Xem thông tin chi tiểt</span>
                                            </Link>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        )) : <>
                            <TableRow>
                                <TableCell colSpan={7} className="font-medium text-center">
                                    Không tìm thấy dữ liệu.
                                </TableCell>
                            </TableRow>
                        </>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AssetTable