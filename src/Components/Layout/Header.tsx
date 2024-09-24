import React from "react";
import { NavLink } from "react-router-dom";
import cartItemModel from "../../Interfaces/cartItemModel";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
let logo = require("../../Assets/Images/techshop.png");

function Header() {
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
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
                  {shoppingCartFromStore?.length
                    ? ` (${shoppingCartFromStore.length})`
                    : ""}
                </NavLink>
              </li>
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                <li className="nav-item pt-a">
                  <button
                    className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "100px",
                    }}
                  >
                    Logout
                  </button>
                </li>
                <li className="nav-item text-white">
                  <NavLink
                    className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "100px",
                    }}
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item text-white">
                  <NavLink
                    className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "100px",
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
