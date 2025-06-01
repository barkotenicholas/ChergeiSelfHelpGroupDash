import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Users from "../pages/Users/Users";

import Login from "../pages/login/Login";
import Layout from "../components/shared/Layout";
import UserDetails from "../pages/UserMeterReadings/UserDetails";
import UsersPayments from "../pages/UserPayments/UsersPayments";
import UserBills from "../pages/bills/UserBills";
import ProtectedRoute from "../components/protected/ProtectedRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/UsersDetails" element={<UserDetails />} />
            <Route path="/UserPayments" element={<UsersPayments />} />
            <Route path="/Bills" element={<UserBills />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
