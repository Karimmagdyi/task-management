import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import Home from "../Home/Home";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto">
        {/* <Outlet /> */}
        <Home />
      </div>
    </>
  );
}
