import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import "./Login.scss";
import { AuthContext } from "../../helpers/AuthContext";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { login, valid } = useContext(AuthContext);

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
        {submitted && valid ? <Navigate to="/administrator" /> : null}
        <label className="login__form__label">
          PRISIJUNGIMO VARDAS <br />
          <input
            className="login__form__input"
            name="username"
            value={values.username}
            placeholder="prisijungimo vardas"
            onChange={handleChange}
          />
        </label>
        <label className="login__form__label">
          SLAPTAŽODIS <br />
          <input
            className="login__form__input"
            type="password"
            name="password"
            value={values.password}
            placeholder="slaptažodis"
            onChange={handleChange}
          />
        </label>
        <div className="login__form__button">
          <button>PRISIJUNGTI</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
