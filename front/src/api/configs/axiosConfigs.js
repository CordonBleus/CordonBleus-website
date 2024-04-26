import axios from "axios";
import {BASE_API_URL} from "../../constants/ConstantsAPI.js";

/**
 *
 */
export const apiUser = axios.create({
    withCredentials:false,
    baseURL:BASE_API_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})



