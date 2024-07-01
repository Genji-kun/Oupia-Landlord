import { SEARCH_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";

class SearchService extends BaseService {
    constructor() {
        super();
    }

    searchAmenities = (keyword: string) => {
        return this.get(SEARCH_ENDPOINTS.AMENITY, undefined, {
            keyword: keyword
        });
    }
}

export const searchService = new SearchService();