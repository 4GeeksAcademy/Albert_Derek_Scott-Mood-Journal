import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/login.css";
import LoginForm from "../component/loginForm";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="login-body d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-2 mb-5 bg-black rounded">
        <div className="card-body">
          <h1 className="text-center mb-4">Scribe Login</h1>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
