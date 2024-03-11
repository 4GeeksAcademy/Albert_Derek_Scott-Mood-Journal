import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const handleRegister = async (full_name, email, password) => {
    try {
      const result = await actions.register(full_name, email, password);
      if (result && result.message === "Registered successfully") {
        console.log("Registration successful");
        navigate("/login"); // Navigate to login page after successful registration
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className="text-center mt-5">
      <h1>Register Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const full_name = e.target.full_name.value;
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleRegister(full_name, email, password);
        }}
      >
        <input type="full_name" name="full_name" placeholder="Full Name"/><br />

        <input type="email" name="email" placeholder="Email" required /><br />

        <input type="password" name="password" placeholder="Password" required/><br />
        
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
