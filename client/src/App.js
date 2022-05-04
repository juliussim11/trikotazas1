import Home from "./pages/Home/Home";
import QuestionPage from "./pages/QuestionPage/QuestionPage";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Login from "./pages/Login/Login";
import Naudojimasis from "./pages/Naudojimasis/Naudojimasis";
import Administrator from "./pages/Administrator/Administrator";
import Positions from "./pages/Positions/Positions";
import Programs from "./pages/Programs/Programs";
import Departaments from "./pages/Departaments/Departaments";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userguide" element={<Naudojimasis />} />
        {isLoggedIn && (
          <>
            <Route path="/administrator" element={<Administrator />} />
            <Route path="/administrator/positions" element={<Positions />} />
            <Route path="/administrator/programs" element={<Programs />} />
            <Route
              path="/administrator/departaments"
              element={<Departaments />}
            />
          </>
        )}
        <Route path="/question/:id" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
