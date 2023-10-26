import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Users from "../pages/Users/Users";

import Login from "../pages/login/Login";
import Layout from "../components/shared/layout";
import UserDetails from "../pages/UserMeterReadings/UserDetails";
import UsersPayments from "../pages/UserPayments/UsersPayments";
import UserBills from "../pages/bills/UserBills";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/UsersDetails" element={<UserDetails />} />
          <Route path="/UserPayments" element={<UsersPayments />} />
          <Route path="/Bills" element={<UserBills />} />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
