import { ASSET_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";
import { TAssetParam } from "@/lib/types";

class AssetService extends BaseService {
    constructor() {
        super();
    }

    getAssets = (params: TAssetParam) => {
        return this.get(ASSET_ENDPOINTS.GET_ASSETS, undefined, params);
    }

    createAsset = (form: FormData) => {
        return this.post(ASSET_ENDPOINTS.CREATE, form);
    }

    getAssetDetail = (slug: string) => {
        return this.get(ASSET_ENDPOINTS.GET_ASSET_DETAIL(slug));
    }
}

export const assetService = new AssetService();

