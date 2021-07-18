import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../App.css";

export default function Register(props) {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
    message: "",
    loading: false,
    loggedIn: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setState({
        loading: true,
      });
      const data = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        body: JSON.stringify({
          username: state.username,
          password: state.password,
          email: state.email,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const { status } = data;
      const res = await data.json();
      if (status !== 200) {
        setState({
          message: res.message,
          loading: false,
        });
      } else if (status === 200) {
        localStorage.setItem("user", res.user);
        localStorage.setItem("accessToken", res.accessToken);
        props.setUser(res.user);
        props.setUserToken(res.accessToken);
        setState({
          loggedIn: true,
          loading: false,
        });
      }
    } catch (err) {
      setState({
        message: "Error in registering. Try again later.",
        loading: false,
      });
      throw err;
    }
  };

  const { username, password, email, message, loggedIn, loading } = state;
  return (
    <div className="container register-container">
      {loggedIn ? (
        <Redirect to={"/"} />
      ) : (
        <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="form-group">
            <label className="header">Email address</label>
            <input
              type="email"
              value={email}
              required
              name="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="header">Username</label>
            <input
              type="text"
              value={username}
              required
              name="username"
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="header">Password</label>
            <input
              type="password"
              value={password}
              required
              name="password"
              className="form-control"
              aria-describedby="passwordHelp"
              id="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <small id="passwordHelp" className="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          {message ? <p className="text-danger">{message}</p> : <div></div>}
          <button type="submit" className="btn btn-primary mt-2">
            Register
          </button>
          <h5 className="mt-3">Have an account?</h5>
          <Link to="/login">Log in here!</Link>
        </form>
      )}
      {loading ? (
        <Loader type="Puff" color="#00BFFF" height={70} width={70} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
