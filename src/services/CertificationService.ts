import { CERTIFICATION_ENDPOINTS } from "@/lib/constants/Endpoints";
import BaseService from "./BaseService";
import { TCreateCertificationForm } from "@/lib/types";

class CertificationService extends BaseService {
    constructor() {
        super();
    }

    createCertification = (form: TCreateCertificationForm) => {
        return this.post(CERTIFICATION_ENDPOINTS.CREATE, form);
    }
}

export const certificationService = new CertificationService();

