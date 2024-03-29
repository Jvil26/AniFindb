import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../../App.css";

import SetUserContext from "../../SetUserContext";

export default function Register({ setUserToken }) {
  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
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
      ...state,
      loading: true,
    });
    console.log(state);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/users/register`,
        {
          method: "POST",
          body: JSON.stringify({
            username: state.username,
            password: state.password,
            email: state.email,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        const data = await res.json();
        localStorage.setItem("user", data.user);
        localStorage.setItem("accessToken", data.accessToken);
        setUser(data.user);
        setUserToken(data.accessToken);
        setState({
          ...state,
          loggedIn: true,
          loading: false,
        });
      }
    } catch (err) {
      setState({
        ...state,
        message: "Unable to register. Try again later.",
        loading: false,
      });
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
