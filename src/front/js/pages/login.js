import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const result = await actions.login(email, password);
      if (result && result.message === "Login successful") {
        navigate("/"); // Make sure this path matches your actual home path
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Login Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleLogin(email, password);
        }}
      >
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
