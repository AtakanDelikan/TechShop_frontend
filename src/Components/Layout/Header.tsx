import React from "react";
import { NavLink } from "react-router-dom";
let logo = require("../../Assets/Images/techshop.png");

function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} style={{ height: "40px" }} className="m-1" />
          </NavLink>
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Panel
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink className="dropdown-item" to="/some-page">
                      Action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/another-page">
                      Another action
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/yet-another-page">
                      Yet another action
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/shoppingCart"
                >
                  <i className="bi bi-cart"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
