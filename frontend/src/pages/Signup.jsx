import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";


export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading, error, signup} = useSignup()

  //register new user
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(username,password)

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
    
      <label>Username : </label>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label>Password : </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
