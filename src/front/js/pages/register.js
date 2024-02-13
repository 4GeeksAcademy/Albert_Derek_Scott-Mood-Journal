import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/register.css";

export const Register = () => {
  const { actions } = useContext(Context);

  const handleRegister = async (email, password) => {
    await actions.register(email, password);
    // Redirect or perform any other action after registration
  };

  return (
    <div className="text-center mt-5">
      <h1>Register Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;
          handleRegister(email, password);
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
