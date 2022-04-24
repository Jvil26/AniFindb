import React, { useState, useContext } from "react";
import AuthError from "../Auth-Views/AuthError";
import Loader from "react-loader-spinner";
import "../../App.css";

import UserContext from "../../UserContext";
import SetUserContext from "../../SetUserContext";

export default function Profile() {
  const [state, setState] = useState({
    message: "",
    loading: false,
    username: "",
    success: false,
  });

  const currentUser = useContext(UserContext);
  const setUser = useContext(SetUserContext);

  const { loading, message, username, success } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleToggle = (e) => {
    const userObj = { ...currentUser, dark_mode: !currentUser.dark_mode };
    setUser(userObj);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      loading: true,
    });
    try {
      const res = await fetch("http://localhost:5000/users/profile/update", {
        method: "POST",
        body: JSON.stringify({
          userID: currentUser._id,
          newUsername: username,
          dark_mode: currentUser.dark_mode,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(data.savedUser));
        setUser(data.savedUser);
        setState({
          ...state,
          success: true,
          message: "Successfully Saved Profile",
        });
      }
    } catch (err) {
      setState({
        ...state,
        message: "Failed to save profile. Try again later.",
        success: false,
      });
    }
  };
  return (
    <div>
      {currentUser ? (
        <div
          className={
            "container profile-container " +
            (currentUser.dark_mode ? "darkBG text-white" : "")
          }
        >
          <form className="edit-profile-form" onSubmit={(e) => handleSave(e)}>
            <div className="form-group custom-control custom-switch mt-5 mb-5">
              <input
                type="checkbox"
                checked={currentUser.dark_mode}
                className="custom-control-input"
                id="customSwitches"
                onChange={handleToggle}
              />
              <label className="custom-control-label" htmlFor="customSwitches">
                <span>Dark Mode</span>
              </label>
            </div>
            <p className="mb-5">
              Account Created On: {currentUser.createdAt.substring(0, 10)}
            </p>
            <p>Username: {currentUser.username}</p>
            <div className="form-group row d-flex justify-content-center mt-5">
              <div className="col-6">
                <label
                  className={
                    "header " +
                    (currentUser.dark_mode ? "text-light" : "text-dark")
                  }
                >
                  Change Username:
                </label>
                <input
                  type="text"
                  value={username}
                  name="username"
                  className={
                    "form-control mt-2 " +
                    (currentUser.dark_mode ? "bg-dark text-light" : "")
                  }
                  id="username"
                  placeholder="New Username"
                  onChange={handleChange}
                />
              </div>
            </div>
            {success === false ? (
              <p className="text-danger">{message}</p>
            ) : (
              <p className="text-success">{message}</p>
            )}
            <button type="submit" className="save btn btn-lg btn-success mt-4">
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
