import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";


export const Signup = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading, error, signup} = useSignup()


  const handleSubmit = (e) => {
    e.preventDefault()
    signup(userName, firstName, lastName, email, password)

  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
      <label>First Name : </label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <label>Last Name : </label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        required
      />

      <label>Username : </label>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        required
      />

      <label>Password : </label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label>Email : </label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />
      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};
