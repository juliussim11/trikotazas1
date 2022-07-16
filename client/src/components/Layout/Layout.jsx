import React from "react";
import { Outlet } from "react-router";
import TopBar from "../TopBar/TopBar";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <TopBar />
      <div className="container">
        <div className="container__content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
