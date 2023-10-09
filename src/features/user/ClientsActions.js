import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetUsers ,searchUsers ,updateSingleUsers ,getUserReadings ,getUserPayments ,updateUserPayment,deleteuserPayment,addNewUsers} from "../../services/user/clients.service";


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
            const response =await getUserReadings(meternumber)
            return response.data
        } catch (error) {
            
        }
    }
)

export const getUsersPayments = createAsyncThunk(
    "client/getClientPayments",
    async(meternumber,thunkAPI)=>{
        try {
            const response = await getUserPayments(meternumber)
            return response.data;
        } catch (error) {
            
        }
    }
)

export const addUserPayment = createAsyncThunk(
    "client/addUsersPayment",
    async(newUser,thunkAPI)=>{
        try {
            const response = await addNewUsers(newUser)
            return response.data
        } catch (error) {
            
        }
    }
)

export const updateUsersPayment = createAsyncThunk(
    "client/updateUsersPayment",
    async(updateInfo,thunkAPI)=>{
        try {
            const response = await updateUserPayment(updateInfo)
            return response.data;
        } catch (error) {
            
        }
    }
)

export const deleteSingleUserPayment = createAsyncThunk(
    "client/deleteUsersPayment",
    async(deleteInfo,thunkAPI)=>{
        try {
            const response = await deleteuserPayment(deleteInfo)
            return response.data;
        } catch (error) {
            
        }
    }
)