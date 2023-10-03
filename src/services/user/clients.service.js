import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const GetUsers=(page)=>{

    return axios.get(`${BASE_URL}/api/v1/clients/?page=${page}&limit=10`)
}

export const searchUsers=(search)=>{
    return axios.get(`${BASE_URL}/api/v1/clients/search?search=${search.search}&page=${search.page}`)
}

export const updateSingleUsers=(update)=>{
    return axios.patch(`${BASE_URL}/api/v1/clients`,update)
}

export const getUserReadings = (meter_number)=>{
    return axios.get(`${BASE_URL}/api/v1/readings/${meter_number}`)
}

export const getUserPayments = (meter_number)=>{
    return axios.get(`${BASE_URL}/api/v1/payments/${meter_number}`)
}