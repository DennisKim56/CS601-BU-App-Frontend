import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Login.css";

import Config from "../utility/config";
const loginApiUrl = Config.BACKEND_URL + "/users/login";

const Login = ({ setUser, user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      username: username,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
    };

    const response = await fetch(loginApiUrl, requestOptions);

    if (response.status === 200 && response.ok) {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userId", data.userId);
      window.localStorage.setItem("name", data.name);
      window.localStorage.setItem("username", data.username);
      setUser({
        userId: data.userId,
        name: data.name,
        username: data.username,
      });
      setError(undefined);
      navigate("/");
    } else {
      setError("Login Failed");
    }
  };
  return (
    <div className="login-page">
      {user ? (
        <div className="login-form">You are already logged in</div>
      ) : (
        <div className="login-form">
          <div className="login-input-container">
            <label className="form-label">Username:</label>
            <input
              className="form-input"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <label className="form-label">Password:</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
          <div className="submit-login">
            <input
              type="submit"
              value="Login"
              className="submit-btn"
              onClick={handleSubmit}
            />
          </div>
          {error && <div className="login-error">Error: Login Failed</div>}
          <div className="create-account-link-container">
            <Link to="/signup" className="create-account-link">
              Create Account
            </Link>
          </div>
        </div>
      )}

      <img
        className="login-splash"
        src={Config.S3_URL_PREFIX + "boston_university.png"}
        alt="Boston University"
      />
    </div>
  );
};

export default Login;
