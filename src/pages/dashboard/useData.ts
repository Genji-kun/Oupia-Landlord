import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { dashboardService } from "@/services/DashboardService";
import { useQuery } from "@tanstack/react-query";

export type MonthlyReviewStatisticsResponse = {
    month?: string,
    totalReviews?: number;
    starReviews?: Record<number, number>;
}

export type TotalStat = {
    totalFollower?: number;
    totalCertification?: number;
    totalReview?: number;
    totalPost?: number;
    totalAsset?: number;
}


export const useData = () => {
    const { data: reviewStat, isFetching: reviewFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_REVIEW_STAT],
        queryFn: async ({ queryKey }) : Promise<MonthlyReviewStatisticsResponse[]> => {
            const [_key] = queryKey;
            const res = await dashboardService.reviews({
                start: '2023-01-01T00:00:00',
                end: '2025-12-31T23:59:59',
            });
            return res.data;
        },
        refetchOnWindowFocus: false,
    })

    const { data: totalStat, isFetching: totalFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_TOTAL_STAT],
        queryFn: async ({ queryKey }) : Promise<TotalStat> => {
            const [_key] = queryKey;
            const res = await dashboardService.stats();
            return res.data;
        },
        refetchOnWindowFocus: false,
    })


    return {
        reviewStat,
        reviewFetching,
        totalStat,
        totalFetching
    }
}