
export const DEV_URL = "http://80.77.185.87:9002/xcs";

export const CONFIG = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Accept-Language": "en-US,en;q=0.5",
        "branchId":1,
        "instId":1,
    }
}

export const LOGIN = DEV_URL + "/authenticate";
export const SIGNOUT = DEV_URL + "/signout";

export const GET_INSTITUTIONS = DEV_URL + "/v1/config/institutions";
export const ADD_INSTITUTION = DEV_URL + "/v1/config/institutions";
export const DELETE_INSTITUTION = DEV_URL + "/v1/config/institutions";
export const GET_ACTIVE_INSTITUTIONS = DEV_URL + "/v1/config/institutions/active";
export const UPDATE_INSTITUTION_STATUS = DEV_URL + "/v1/config/institutions/status-change";

export const COUNTRY_LIST = DEV_URL + "/v1/lookup/countries";