import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login } = useLogin();


  //user login
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  //guest login
  const guestLogin = (e) => {
    e.preventDefault()
    login("johnDoe","johnDoe")
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log in</h3>
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
      <div className="loginButton">
      <button disabled={isLoading}>Log in</button>
      <button disabled={isLoading} className="tryMe" onClick={guestLogin}>Try me!</button>
      </div>
      {error && <div className="formError">{error}</div>}
      {isLoading && <div className={isLoading? "loader" : ""}></div>}
    </form>
  );
};
