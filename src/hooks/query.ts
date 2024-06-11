import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { assetService } from "@/services/AssetService";
import { userService } from "@/services/UserService";
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
            return res.data.content;
        },
        refetchOnWindowFocus: false
    });

    return {
        assets: data,
        isFetchingAssets: isFetching
    }
}

export const useSearchUsers = (keyword: string) => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.SEARCH_USERS, keyword],
        queryFn: async ({ queryKey }) => {
            const [_key, keyword] = queryKey;
            const res = await userService.searchUsers({
                keyword: keyword,
                page: undefined,
                size: 8
            });
            return res.data.content;
        },
        refetchOnWindowFocus: false

    });

    return {
        users: data,
        isFetchingUsers: isFetching
    }
}