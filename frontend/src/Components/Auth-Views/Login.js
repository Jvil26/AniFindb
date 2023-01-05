import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../../App.css";

import SetUserContext from "../../SetUserContext";

export default function Login(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    message: "",
    loading: false,
    loggedIn: false,
  });

  const setUser = useContext(SetUserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({
      loading: true,
    });
    const res = await fetch("${process.env.REACT_APP_SERVER_URL}/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("accessToken", data.accessToken);
      setUser(data.user);
      props.setUserToken(data.accessToken);
      setState({
        ...state,
        loggedIn: true,
        loading: false,
      });
    } else {
      setState({
        ...state,
        message: data.message,
        loading: false,
      });
    }
  };

  const { username, password, message, loggedIn, loading } = state;
  return (
    <div className="container login-container">
      {loggedIn ? (
        <Redirect to={"/"} />
      ) : (
        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label className="header">Username</label>
            <input
              type="text"
              required
              name="username"
              className="form-control"
              id="username"
              value={username}
              placeholder="Enter Username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="header">Password</label>
            <input
              type="password"
              required
              name="password"
              className="form-control"
              id="password"
              value={password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
          {message ? <p className="text-danger">{message}</p> : <div></div>}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <h5 className="mt-4">Don't have an account?</h5>
          <Link to="/register">Register here!</Link>
          <h5 className="mt-2">Forgot Password?</h5>
          <Link to="/email-confirmation">Reset Password</Link>
        </form>
      )}
      {loading ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
