import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import "../App.css";

export default function EmailConfirmation(props) {
  const [state, setState] = useState({
    email: "",
    message: "",
    loading: false,
    confirmEmail: "",
    success: false,
  });
  const { message, confirmEmail, loading, success } = state;

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
        loading: true,
      });
      const res = await fetch(
        "http://localhost:5000/users/send-confirmation-email",
        {
          method: "POST",
          body: JSON.stringify({
            email: confirmEmail,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status !== 200) {
        setState({
          ...state,
          message: data.message,
          loading: false,
          success: false,
        });
      } else if (res.status === 200) {
        setState({
          ...state,
          success: true,
          loading: false,
          message: data.message,
        });
        localStorage.setItem("resetEmail", data.user.email);
      }
    } catch (err) {
      setState({
        message: "Failed to send email. Try again later.",
        loading: false,
        success: false,
      });
    }
  };
  return (
    <div className="container resetPassword-container">
      <form className="confirmEmail-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group d-flex justify-content-center mt-5">
          <div className="col-6">
            <label className="header">Confirmation Email:</label>
            <input
              type="text"
              required
              value={confirmEmail}
              name="confirmEmail"
              className="form-control mt-2"
              id="confirmEmail"
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
