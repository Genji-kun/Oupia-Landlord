export const AUTH_ENDPOINTS = {
    SIGN_IN: `auth/login/`,
    CURRENT_USER: `auth/me/`
}

export const ASSET_ENDPOINTS = {
    CREATE: `store/landlord/assets/`,
    GET_ASSETS: `search/assets/`,
    GET_ASSET_DETAIL: (slug: string) => `search/assets/${slug}`
}

export const USER_ENDPOINTS = {
    SEARCH: `search/users/`
}

export const CERTIFICATION_ENDPOINTS = {
    SEARCH: `store/landlord/ceritications/`,
    CREATE: `store/landlord/ceritications/`
}

export const DASHBOARD_ENDPOINTS = {
    TOTAL: `store/landlord/stat/`,
    REVIEWS: `store/landlord/stat/reviews/monthly/`
}