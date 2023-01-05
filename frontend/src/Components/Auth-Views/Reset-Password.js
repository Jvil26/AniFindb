import React, { useState } from "react";
import Loader from "react-loader-spinner";
import "../../App.css";

export default function ResetPassword() {
  const [state, setState] = useState({
    newPassword: "",
    message: "",
    loading: false,
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
    setState({
      loading: true,
    });
    try {
      const resetEmail = localStorage.getItem("resetEmail");
      const res = await fetch(
        "process.env.REACT_APP_SERVER_URL/users/reset-password",
        {
          method: "POST",
          body: JSON.stringify({
            newPassword: state.newPassword,
            resetEmail: resetEmail,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.status === 200) {
        setState({
          ...state,
          message: data.message,
          loading: false,
          success: true,
        });
        localStorage.removeItem("resetEmail");
      }
    } catch (err) {
      setState({
        ...state,
        message: "Failed to reset password. Try again later",
        loading: false,
        success: false,
      });
    }
  };
  return (
    <div className="container login-container">
      <form className="resetPassword-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group d-flex justify-content-center mt-5">
          <div className="col-6">
            <label className="header">New Password:</label>
            <input
              type="password"
              required
              name="newPassword"
              className="form-control mt-1"
              id="newPassword"
              value={state.newPassword}
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
        </div>
        {state.success === false ? (
          <p className="text-danger">{state.message}</p>
        ) : (
          <p className="text-success">{state.message}</p>
        )}
        <button type="submit" className="btn btn-primary mt-3">
          Reset Password
        </button>
      </form>
      {state.loading ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
