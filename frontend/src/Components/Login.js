import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../App.css";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    message: "",
    loading: false,
    loggedIn: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    try {
      e.preventDefault();
      this.setState({
        loading: true,
      });
      const data = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const { status } = data;
      const res = await data.json();
      if (status !== 200) {
        this.setState({
          message: res.message,
          loading: false,
        });
      } else if (status === 200) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("accessToken", res.accessToken);
        this.props.setUser(res.user);
        this.props.setUserToken(res.accessToken);
        this.setState({
          loggedIn: true,
          loading: false,
        });
      }
    } catch (err) {
      this.setState({
        message: "Error logging in. Try again later.",
        loading: false,
      });
    }
  };
  render() {
    const { username, password, message, loggedIn, loading } = this.state;
    return (
      <div className="container login-container">
        {loggedIn ? (
          <Redirect to={"/"} />
        ) : (
          <form
            className="register-form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="form-group">
              <label className="header">Username</label>
              <input
                type="text"
                required
                value={username}
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                onChange={this.handleChange}
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
                id="password"
                placeholder="Enter Password"
                onChange={this.handleChange}
              />
            </div>
            {message ? <p className="text-danger">{message}</p> : <div></div>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <h5 className="mt-4">Don't have an account?</h5>
            <Link to="/register">Register here!</Link>
            <h5 className="mt-2">Forgot Password?</h5>
            <Link to="/reset-password">Reset Password</Link>
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
}
