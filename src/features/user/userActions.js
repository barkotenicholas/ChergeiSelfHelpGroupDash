import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserLogin } from "../../services/user/user.service";

export const loginUser = createAsyncThunk(
  "user/registerUser",
  async (data, thunkAPI) => {
    try {

      const response = await UserLogin(data);
      
      return response.data;
    } catch (error) {
      console.log(error)
      const message =
        (error.response && error.response.data &&  error.response.data.message) ||  error.message ||    error.toString();    thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
