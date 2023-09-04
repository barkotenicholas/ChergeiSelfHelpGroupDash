import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUsers ,searchUsers } from "../../services/user/clients.service";


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

            console.log(search);

            const response = await searchUsers(search);
            
            return response.data

        } catch (error) {
            
        }
    }   
)