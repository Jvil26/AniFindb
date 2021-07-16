import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../App.css";

export default class ResetPassword extends Component {
  state = {
    email: "",
    resetPassword: "",
    message: "",
    loading: false,
    confirmedEmail: false,
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
    } catch (err) {
      this.setState({
        message: "Error logging in. Try again later.",
        loading: false,
      });
    }
  };
  render() {
    const { email, resetPassword, message, confirmedEmail, loading } =
      this.state;
    return (
      <div className="container resetPassword-container">
        {confirmedEmail ? (
          <Redirect to={"/login"} />
        ) : (
          <form
            className="register-form"
            onSubmit={(e) => this.handleSubmit(e)}
          >
            <div className="form-group d-flex justify-content-center mt-5">
              <div className="col-6">
                <label className="header">Confirmation Email:</label>
                <input
                  type="text"
                  required
                  value={email}
                  name="email"
                  className="form-control mt-2"
                  id="email"
                  placeholder="Enter Confirmation Email"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {message ? <p className="text-danger">{message}</p> : <div></div>}
            <button type="submit" className="btn btn-primary mt-3">
              Send Email
            </button>
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
