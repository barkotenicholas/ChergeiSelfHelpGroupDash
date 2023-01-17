import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
const reducer = {
    user:userSlice
}

const store = configureStore({
    reducer:reducer,
    devTools:true
})

export default store;