import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const GetUsers=(page)=>{

    return axios.get(`${BASE_URL}/api/v1/clients/?page=${page}&limit=10`)
}