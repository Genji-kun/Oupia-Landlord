import { QUERY_KEY } from "@/lib/constants/QueryKeys";
import { assetService } from "@/services/AssetService";
import { certificationService } from "@/services/CertificationService";
import { userService } from "@/services/UserService";
import { useCurrentUserStore } from "@/stores/currrentUserStore";
import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { useFilter } from "./useFilter";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { searchService } from "@/services/SearchService";

export const useSearchAssets = (size?: number, page?: number) => {

    const [totalPage, setTotalPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const currentUser = useCurrentUserStore((state) => state.currentUser);
    const { keyword } = useFilter();


    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_ASSETS, { keyword, size, page }],
        queryFn: async ({ queryKey }: any) => {
            const [_key, { keyword, size, page }] = queryKey
            const res = await assetService.getAssets({
                keyword: keyword,
                userId: currentUser!.id,
                size: size || 5,
                page: page || 1
            });

            setTotalPage(res.data.totalPages);
            setTotalElements(res.data.totalElements);
            return res.data.content;
        },
        refetchOnWindowFocus: false
    });

    return {
        totalPage,
        totalElements,
        assets: data,
        isFetchingAssets: isFetching
    }
}

export const useSearchCertifications = (size?: number, page?: number) => {

    const [totalPage, setTotalPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const { keyword } = useFilter();

    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_CERTIFICATIONS, { keyword, size, page }],
        queryFn: async ({ queryKey }: any) => {
            const [_key, { keyword, size, page }] = queryKey
            const res = await certificationService.getCertifications({
                keyword: keyword,
                size: size || 5,
                page: page || 1
            });

            setTotalPage(res.data.totalPages);
            setTotalElements(res.data.totalElements);
            return res.data.content;
        },
        refetchOnWindowFocus: false
    });

    return {
        totalPage,
        totalElements,
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

export const useSearchAmenities = (keyword: string) => {
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.SEARCH_AMENITIES, keyword],
        queryFn: async ({ queryKey }) => {
            const [_key, keyword] = queryKey;
            const res = await searchService.searchAmenities(keyword);
            return res.data.content;
        },
        refetchOnWindowFocus: false,
        enabled: !!keyword
    });

    return {
        amenities: data,
        isFetching
    }
}

export const useAssetDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, isFetching } = useQuery({
        queryKey: [QUERY_KEY.GET_ASSET_DETAIL, slug],
        queryFn: async ({ queryKey }) => {
            const [_key, slug] = queryKey;
            const res = await assetService.getAssetDetail(slug || '');
            return res.data;
        },
        refetchOnWindowFocus: false,
        enabled: !!slug
    })

    return {
        asset: data,
        assetFetching: isFetching
    }
}