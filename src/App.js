import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import ViewActivity from "./components/activity/view_activity.component";
import Home from "./components/home/home.component";
import Login from "./components/login/login.component";
import SignUp from "./components/signup/signup.component";
function App() {
  const logout = () => {
    sessionStorage.removeItem("url_token");
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>
              URL Shortner
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to={"/"}>
                    Home
                  </Link>
                </li>
                {sessionStorage.getItem("url_token") != null && (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/activity"}>
                      Activity
                    </Link>
                  </li>
                )}
                {sessionStorage.getItem("url_token") == null && (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                )}
                {sessionStorage.getItem("url_token") == null && (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                )}
                {sessionStorage.getItem("url_token") != null && (
                  <li className="nav-item">
                    <Link className="nav-link" onClick={logout} to={"/sign-in"}>
                      <i className="bi bi-power"></i>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="wrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/activity" element={<ViewActivity />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
export default App;
