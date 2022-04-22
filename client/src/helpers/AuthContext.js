import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

import PropTypes from "prop-types";

const AuthContext = createContext({
  isLoggedIn: false,
});

const AuthContextProvider = (props) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    localStorage.getItem("accessToken")
  );

  const handleLogin = (data) => {
    axios
      .post("http://localhost:5000/administrator/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          localStorage.setItem("accessToken", response.data);
        }
      });
    setUserIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUserIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn: userIsLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/administrator/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setUserIsLoggedIn(false);
        } else {
          setUserIsLoggedIn(true);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, AuthContext };
