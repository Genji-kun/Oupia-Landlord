import { AUTH_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";
import { TSignInForm } from "@/lib/types";
import { AxiosResponse } from "axios";
import { ICurrentUser } from "@/lib/interfaces/User";

class AuthService extends BaseService {
    constructor() {
        super();
    }

    signIn = (form: TSignInForm) => {
        return this.post(AUTH_ENDPOINTS.SIGN_IN, form);
    }

    currentUser = (): Promise<AxiosResponse<ICurrentUser>> => {
        return this.get(AUTH_ENDPOINTS.CURRENT_USER);
    }
}

export const authService = new AuthService();