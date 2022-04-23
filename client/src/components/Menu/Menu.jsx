import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import "./Menu.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu = (props) => {
  let menuRef = useRef();

  const { isLoggedIn, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        props.setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);

    const handleKeyboardClick = (e) => {
      if (e.keyCode === 27) {
        props.setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyboardClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyboardClick);
    };
  });

  const onLogout = () => {
    logout();
    navigate("/");
  };

  console.log(isLoggedIn);

  return (
    <div className="menu" ref={menuRef}>
      <ul className="menu__content">
        {!isLoggedIn ? (
          <Link to={`/login`} className="link">
            <li>Login</li>
          </Link>
        ) : (
          <button onClick={onLogout}>Logout</button>
        )}
        <Link to={`/userguide`} className="link">
          <li>Naudojimosi gidas</li>
        </Link>
      </ul>
    </div>
  );
};

Menu.propTypes = {
  setMenuOpen: PropTypes.func,
};

export default Menu;
