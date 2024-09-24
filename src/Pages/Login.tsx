import React from "react";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="container text-center">
      <form className="mb-5" method="post">
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
            />
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
          >
            Login
          </button>
        </div>
      </form>
      <p>You don't have an account?</p>
      <NavLink to="/register">Create one!</NavLink>
    </div>
  );
}

export default Login;
