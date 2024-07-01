import { CERTIFICATION_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";
import { TCreateCertificationForm, TUserParam } from "@/lib/types";

class CertificationService extends BaseService {
    constructor() {
        super();
    }

    getCertifications = (params: TUserParam) => {
        return this.get(CERTIFICATION_ENDPOINTS.SEARCH, undefined, params);
    }


    createCertification = (form: TCreateCertificationForm) => {
        return this.post(CERTIFICATION_ENDPOINTS.CREATE, form);
    }
}

export const certificationService = new CertificationService();

