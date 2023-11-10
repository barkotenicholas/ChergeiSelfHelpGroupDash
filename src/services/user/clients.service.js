import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const GetUser=(id)=>{

    return axios.get(`${BASE_URL}/api/v1/clients/${id}`)
}

export const GetUsers=(page)=>{

    return axios.get(`${BASE_URL}/api/v1/clients/?page=${page}&limit=10`)
}

export const searchUsers=(search)=>{
    return axios.get(`${BASE_URL}/api/v1/clients/search?search=${search.search}&page=${search.page}`)
}

export const updateSingleUsers=(update)=>{
    return axios.patch(`${BASE_URL}/api/v1/clients`,update)
}

export const getUserReadings = async (meter_number)=>{
    return axios.get(`${BASE_URL}/api/v1/readings/${meter_number}`)
}

export const getUserPayments = (meter_number)=>{
    return axios.get(`${BASE_URL}/api/v1/payments/${meter_number}`)
}

export const addNewUsers = (newPayment)=>{
    return axios.post(`${BASE_URL}/api/v1/payments/`,newPayment)
}

export const updateUserPayment = (updatePayment)=>{
    return axios.patch(`${BASE_URL}/api/v1/payments/`,updatePayment)
}

export const deleteuserPayment = (deletePayment)=>{
    return axios.delete(`${BASE_URL}/api/v1/payments/`,{data:deletePayment})

}

export const addUserMeterReading = (newReading)=>{

    return axios.post(`${BASE_URL}/api/v1/readings/`,newReading)

}

export const updateLatestReading = (updatedReading)=>{

    return axios.patch(`${BASE_URL}/api/v1/readings/`,updatedReading)

}

// Billing apis

export const billLatest = (bill)=>{

    return axios.post(`${BASE_URL}/api/v1/bills/`,bill)

}

export const getUserBill = (meter_number)=>{

    return axios.get(`${BASE_URL}/api/v1/bills/${meter_number}`)

}


// get sms balance api 

export const getSmsBalance = ()=>{

    return axios.get(`${BASE_URL}/api/v1/at/`)

}

// Delete MeterNumber

export const deleteMeter=(meterdata)=>{
    
    return axios.delete(`${BASE_URL}/api/v1/readings/`,{data:meterdata});

}