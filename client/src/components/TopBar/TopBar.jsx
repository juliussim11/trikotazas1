import React, { useState } from "react";
import "./TopBar.scss";
import Logo from "../../assets/header-logo.svg";
import MenuIcon from "../../assets/menu_icon.svg";
import Menu from "../Menu/Menu";
import { NavLink } from "react-router-dom";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="topbar">
      <div className="topbar__content">
        <div className="topbar__content__invisible-item" />
        <NavLink to="/">
          <img className="topbar__content__logo" src={Logo} />
        </NavLink>
        <div onClick={handleMenuClick}>
          <img className="topbar__content__menu" src={MenuIcon} />
        </div>
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      </div>
    </header>
  );
};

export default TopBar;
