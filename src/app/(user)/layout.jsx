import React from "react";
import Navbar from "../components/layouts/user/Navbar";
import Sidebar from "../components/layouts/Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="ml-[250px] pt-[80px]">{children}</div>
    </div>
  );
}
