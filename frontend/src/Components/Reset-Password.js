import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../App.css";

export default function ResetPassword() {
  const [state, setState] = useState({
    email: "",
    resetPassword: "",
    message: "",
    loading: false,
    confirmedEmail: false,
    oldPassword: "",
    newPassword: "",
    success: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setState({
        ...state,
        success: true,
        loading: false,
        message: "Successfully Sent Email!",
      });
    } catch (err) {
      setState({
        message: "Error logging in. Try again later.",
        loading: false,
        success: false,
      });
    }
  };
  const {
    email,
    resetPassword,
    message,
    confirmedEmail,
    loading,
    oldPassword,
    newPassword,
    success,
  } = state;
  return (
    <div className="container resetPassword-container">
      {confirmedEmail ? (
        <Redirect to={"/login"} />
      ) : (
        <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
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
                onChange={handleChange}
              />
            </div>
          </div>
          {success === false ? (
            <p className="text-danger mt-2">{message}</p>
          ) : (
            <p className="text-success mt-2">{message}</p>
          )}
          <button type="submit" className="btn btn-primary mt-3">
            Send Email
          </button>
        </form>
      )}
      {loading ? (
        <Loader
          className="mt-4"
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
