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
        <div className="topbar__content__menu" onClick={handleMenuClick}>
          <img src={MenuIcon} />
          <div className="topbar__content__menu__popup">
            {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
