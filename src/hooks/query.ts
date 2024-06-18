import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { assetService } from "@/services/AssetService";
import { certificationService } from "@/services/CertificationService";
import { userService } from "@/services/UserService";
import { useCurrentUserStore } from "@/stores/currrentUserStore";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";

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

export const useSearchCertifications = () => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_CERTIFICATIONS],
        queryFn: async () => {
            const res = await certificationService.getCertifications();
            return res.data.content;
        },
        refetchOnWindowFocus: false
    });

    return {
        certifications: data,
        isFetchingCertifications: isFetching
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

export const useSearhLocation = (searchQuery: string) => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.SEARCH_USERS, searchQuery],
        queryFn: async ({ queryKey }) => {
            const [_key, searchQuery] = queryKey;
            const res = await axios.get(`https://rsapi.goong.io/Place/AutoComplete?input=${searchQuery}, Việt Nam&api_key=${import.meta.env.VITE_PUBLIC_GOONG_MAPS_API_KEY}&sessionToken=${localStorage.getItem("sessionToken")}`);
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!searchQuery

    });

    return {
        location: data,
        isFetchingLocation: isFetching
    }
}