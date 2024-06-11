import { USER_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";
import { TUserParam } from "@/lib/types";

class UserService extends BaseService {
    constructor() {
        super();
    }

    searchUsers = (params: TUserParam) => {
        return this.get(USER_ENDPOINTS.SEARCH, undefined, params);
    }
}

export const userService = new UserService();

