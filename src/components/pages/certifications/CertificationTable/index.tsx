import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { ICertification } from "@/lib/interfaces/Certification";
import { Status } from "@/lib/enums";

const CertificationTable = ({ data }: { data: ICertification[] }) => {
    return (
        <div className="shadow-md rounded-lg overflow-hidden">
            <Table className="bg-background rounded-lg">
                <TableHeader className=" uppercase">
                    <TableRow className="bg-primary-500/80 hover:bg-primary-500">
                        <TableHead className="font-semibold w-80">Tên căn hộ</TableHead>
                        <TableHead className="font-semibold w-80">Địa chỉ</TableHead>
                        <TableHead className="font-semibold text-center">Người thuê</TableHead>
                        <TableHead className="font-semibold text-center">Trạng thái</TableHead>
                        <TableHead className="font-semibold text-center">Ngày bắt đầu</TableHead>
                        <TableHead className="font-semibold text-center">Ngày hết hạn</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data && data.length > 0 ? data.map((certification: ICertification) => (
                            <TableRow key={certification.id}>
                                <TableCell className="font-medium">
                                    <span className="font-semibold">{certification.assetName}</span>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <p className="line-clamp-3">
                                        {certification.assetAddress}
                                    </p>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center justify-center h-full">
                                        {certification.tenantName}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center justify-center h-full">
                                        <>
                                            {
                                                (() => {
                                                    switch (certification.status) {
                                                        case Status.ACCEPTED:
                                                            return <span className="text-green-500">Chấp Nhận</span>;
                                                        case Status.PENDING:
                                                            if (new Date() > new Date(certification.expireDate)) {
                                                                return <span className="text-destructive">Đã hết hạn</span>;
                                                            }
                                                            return <span className="text-yellow-500">Đăng chờ</span>;

                                                        case Status.DENIED:
                                                            return <span className="text-destructive">Từ chối</span>;
                                                    }
                                                })()
                                            }
                                        </>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center justify-center h-full">
                                        {format(certification.startDate, "dd-MM-yyyy")}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center justify-center h-full">
                                        {format(certification.expireDate, "dd-MM-yyyy")}
                                    </div>
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

export default CertificationTable