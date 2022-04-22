import React from "react";
import ReactDOM from "react-dom";
import { AuthContextProvider } from "./helpers/AuthContext";

import App from "./App";
import "./styles/index.scss";

ReactDOM.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>,
  document.getElementById("root")
);
