import React, { useState } from "react";
import Loader from "react-loader-spinner";
import AuthError from "./AuthError";
import "../App.css";

export default function Profile(props) {
  const [state, setState] = useState({
    message: "",
    loading: false,
    username: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleToggle = (e) => {
    const { darkMode } = props;
    return props.setDarkMode(!darkMode);
  };

  const handleSave = () => {};
  const { darkMode, currentUser } = props;
  const { loading, message, username, oldPassword, newPassword } = state;
  return (
    <div>
      {currentUser ? (
        <div
          className={
            "container profile-container " +
            (darkMode ? "darkBG text-white" : "")
          }
        >
          <div className="custom-control custom-switch mt-5 mb-5">
            <input
              type="checkbox"
              checked={darkMode}
              className="custom-control-input"
              id="customSwitches"
              onChange={handleToggle}
            />
            <label className="custom-control-label" htmlFor="customSwitches">
              <span>Dark Mode</span>
            </label>
          </div>
          <p>Username: {currentUser.username}</p>
          <form className="edit-profile-form" onSubmit={(e) => handleSave(e)}>
            <div className="form-group row d-flex justify-content-center mt-5">
              <div className="col-6">
                <label
                  className={
                    "header " + (darkMode ? "text-light" : "text-dark")
                  }
                >
                  New Username:
                </label>
                <input
                  type="text"
                  value={username}
                  name="username"
                  className={
                    "form-control mt-2 " +
                    (darkMode ? "bg-dark text-light" : "")
                  }
                  id="username"
                  placeholder="New Username"
                  onChange={handleChange}
                />
              </div>
            </div>
            {message ? <p className="text-danger">{message}</p> : <div></div>}
            <button
              type="button"
              className="save btn btn-lg btn-success mt-4"
              onClick={handleSave}
            >
              Save
            </button>
          </form>
          {loading ? (
            <Loader type="Puff" color="#00BFFF" height={100} width={100} />
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <AuthError />
      )}
    </div>
  );
}
