import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

export const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="google-style">
            <span className="blue">T</span>
            <span className="red">o</span>
            <span className="yellow">d</span>
            <span className="blue">o</span>
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={logout}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
