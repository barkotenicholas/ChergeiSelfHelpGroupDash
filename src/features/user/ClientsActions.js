import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUsers ,searchUsers ,updateSingleUsers ,getUserReadings} from "../../services/user/clients.service";


export const getAllUsers =  createAsyncThunk(
    "clients/getClients",
    async (page,thunkAPI) =>{
        try {
            const response = await GetUsers(page);
            
            return response.data

        } catch (error) {
            
        }
    }   
)

export const searchAllUsers =  createAsyncThunk(
    "clients/searchClients",
    async (search,thunkAPI) =>{
        try {


            const response = await searchUsers(search);
            
            return response.data

        } catch (error) {
            
        }
    }   
)

export const updateUsers = createAsyncThunk(
    "clients/updateUser",
    async(update,thunkAPI)=>{
        try {
            const response =await updateSingleUsers(update)
            return response.data
        } catch (error) {
            
        }
    }
)

export const getUsersDetails = createAsyncThunk(
    "clients/getClientReadings",
    async(meternumber,thunkAPI)=>{
        try {
            console.log(meternumber);
            const response =await getUserReadings(meternumber)
            return response.data
        } catch (error) {
            
        }
    }
)