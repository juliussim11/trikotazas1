import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import "./Login.scss";
import axios from "axios";
import { AuthContext } from "../../helpers/AuthContext";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { username: values.username, password: values.password };
    login(data);
    setSubmitted(true);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        {submitted ? <Navigate to="/administrator" /> : null}
        <div className="login__form__input">
          <div>PRISIJUNGIMO VARDAS</div>
          <input
            name="username"
            value={values.username}
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="login__form__input">
          <div>SLAPTAŽODIS</div>
          <input
            name="password"
            value={values.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className="login__form__button">
          <button>LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
