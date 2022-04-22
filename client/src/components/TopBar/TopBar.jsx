import React, { useState, useRef, useEffect } from "react";
import "./TopBar.scss";
// import { ReactComponent as Logo } from "assets/header-logo.svg";
import Logo from "../../assets/header-logo.svg";
import MenuIcon from "../../assets/menu_icon.svg";
import Menu from "../Menu/Menu";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="topbar">
      <div className="topbar__content">
        <div className="topbar__content__invisible-item" />
        <img className="topbar__content__logo" src={Logo} />
        <div onClick={handleMenuClick}>
          <img className="topbar__content__menu" src={MenuIcon} />
        </div>
        {menuOpen && <Menu setMenuOpen={setMenuOpen} />}
      </div>
    </header>
  );
};

export default TopBar;
