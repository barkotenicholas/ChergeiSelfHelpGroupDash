import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
// import Layout from "../components/shared/layout";
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}>
          <Route index  element={<Home/>} />
        </Route> */}
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
