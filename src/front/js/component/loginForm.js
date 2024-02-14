import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

// LoginForm Component
const LoginForm = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await actions.login(email, password);
      if (result && result.message === "Login successful") {
        navigate("/");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button type="submit" className="btn btn-custom">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
