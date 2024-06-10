import { useState } from "react";

import Config from "../utility/config";

import "./UserCreate.css";

const UserCreate = ({ setUser, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setpassword2] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [password2Error, setpassword2Error] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e, field) => {
    switch (field) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "password2":
        setpassword2(e.target.value);
        break;
      default:
    }
  };

  const validateName = (str) => {
    const letterRegex = /^[a-zA-Z ]+$/;
    if (str?.length < 2) {
      return false;
    } else if (!letterRegex.test(str)) {
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = (str) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(str);
  };

  const validateUsername = (str) => {
    const letterNumberRegex = /^[a-zA-Z0-9]+$/;
    return letterNumberRegex.test(str);
  };

  const validatePassword = (str) => {
    const letterNumberRegex = /^[a-zA-Z0-9]+$/;
    return letterNumberRegex.test(str);
  };

  const handleSubmit = async () => {
    setNameError(false);
    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setpassword2Error(false);
    setError(null);
    let passValidation = true;
    if (!validateName(name)) {
      setNameError(true);
      setError("Invalid name");
      passValidation = false;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      setError("Invalid email");
      passValidation = false;
    }
    if (!validateUsername(username)) {
      setUsernameError(true);
      setError("Invalid username");
      passValidation = false;
    }
    if (!validatePassword(password)) {
      setPasswordError(true);
      setError("Invalid password");
      passValidation = false;
    }
    if (!validatePassword(password2)) {
      setpassword2Error(true);
      setError("Invalid password");
      passValidation = false;
    }
    if (password != password2) {
      setPasswordError(true);
      setpassword2Error(true);
      setError("Passwords do not match");
      passValidation = false;
    }
    if (passValidation) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const payload = JSON.stringify({
        username: username,
        password: password,
        name: name,
        email: email,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: payload,
      };

      const response = await fetch(
        Config.BACKEND_URL + "/users/signup",
        requestOptions
      );

      if (response.status === 201) {
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
      } else if (response.status === 422) {
        setUsernameError(true);
        setError("Username Already Exists");
      } else {
        setError("Login Failed");
      }
    }
  };
  console.log(user);
  return (
    <div className="create-user-container">
      {user ? (
        <div className="logged-in">You are logged in as {user.username}</div>
      ) : (
        <div id="form-id" className="create-user-form-container shadow">
          <h1 className="create-user-form-title">Create Account</h1>
          <div className="create-user-form-grid">
            <label>Name</label>
            <input
              className={nameError ? "input-error" : ""}
              type="text"
              value={name}
              onChange={(e) => handleChange(e, "name")}
            />
            <label>Email</label>
            <input
              className={emailError ? "input-error" : ""}
              type="email"
              value={email}
              onChange={(e) => handleChange(e, "email")}
            />
            <label>Username</label>
            <input
              className={usernameError ? "input-error" : ""}
              type="text"
              value={username}
              onChange={(e) => handleChange(e, "username")}
            />
            <label>Password</label>
            <input
              className={passwordError ? "input-error" : ""}
              type="password"
              value={password}
              onChange={(e) => handleChange(e, "password")}
            />
            <label>Confirm Password</label>
            <input
              className={password2Error ? "input-error" : ""}
              type="password"
              value={password2}
              onChange={(e) => handleChange(e, "password2")}
            />
          </div>
          {error && <div className="input-error-message">{error}</div>}
          <div className="create-user-form-submit-container">
            <input type="submit" value="Create" onClick={handleSubmit} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreate;
