import React from "react";
import Navbar from "../shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[61vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
