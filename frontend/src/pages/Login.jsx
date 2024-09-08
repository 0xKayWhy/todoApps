import { useLogin } from "../hooks/useLogin";
import { useState } from "react";

export const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isLoading, error, login} = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

    return (
        <form className="signup" onSubmit={handleSubmit}>
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
      <button disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      </form>
    )
}