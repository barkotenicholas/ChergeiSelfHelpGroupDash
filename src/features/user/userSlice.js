import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./userActions";
const initialState = { 
    user:null,
    isLoginSuccess:false
};

const userSlice = createSlice({
    name:"user",
    initialState:initialState,
    extraReducers(builder){
   
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.user = action.payload
            state.isLoginSuccess = true
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.isLoginSuccess = true

        })
    }
});

export default userSlice.reducer;