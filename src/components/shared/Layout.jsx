import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";
const Layout = () => {
  return (
    <div className=" flex flex-row h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col w-screen">
          <Header />
          <Outlet />  
      </div>
    </div>
  );
};

export default Layout;