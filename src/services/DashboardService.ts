import { DASHBOARD_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";
import { TMonthlyReviewParam } from "@/lib/types";

class DashboardService extends BaseService {
    constructor() {
        super();
    }

    stats = () => {
        return this.get(DASHBOARD_ENDPOINTS.TOTAL);
    }

    reviews = (params: TMonthlyReviewParam) => {
        return this.get(DASHBOARD_ENDPOINTS.REVIEWS, undefined, params);
    }
}

export const dashboardService = new DashboardService();

