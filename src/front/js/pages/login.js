import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";

export const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    const result = await actions.login(email, password);
    if (result.success) {
      // Assuming login action returns an object with a success property
      navigate("/home"); // Make sure this path matches your actual home path
    } else {
      // Handle login failure, e.g., set error state, show message, etc.
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
