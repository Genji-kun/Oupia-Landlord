import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { assetService } from "@/services/AssetService";
import { useCurrentUserStore } from "@/stores/currrentUserStore";
import { useQuery } from "@tanstack/react-query"

export const useSearchAssets = (keyword: string, size?: number, page?: number) => {
    const currentUser = useCurrentUserStore((state) => state.currentUser);
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_ASSETS, { keyword, size, page }],
        queryFn: async ({ queryKey }: any) => {
            const [_key, { keyword, size, page }] = queryKey
            const res = await assetService.getAssets({
                keyword: keyword,
                userId: currentUser!.id,
                size: 4,
                page: page
            });
            console.table(res.data.content);
            return res.data.content;
        },
        refetchOnWindowFocus: false
    });

    return {
        assets: data,
        isFetchingAssets: isFetching
    }
}