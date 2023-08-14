import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const UserLogin  = (data)=>{

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    return axios.post(`${BASE_URL}/api/v1/auth/login`,data, headers
    ).then((response)=>{
        console.log(response);
    })

};