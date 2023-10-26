import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";

const reducer = {
    user:userSlice
}

const customMidlle = getDefaultMiddleware({
    serializableCheck:false
})

const store = configureStore({
    reducer:reducer,
    devTools:true,
    middleware: customMidlle
})

export default store;