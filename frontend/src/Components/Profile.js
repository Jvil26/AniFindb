import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "../App.css";

export default class Profile extends Component {
  state = {
    message: "",
    loading: false,
    username: "",
    oldPassword: "",
    newPassword: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleToggle = (e) => {
    const { darkMode } = this.props;
    return this.props.setDarkMode(!darkMode);
  };

  handleSave = () => {};
  render() {
    const { darkMode, currentUser } = this.props;
    const { loading, message, username, oldPassword, newPassword } = this.state;
    return (
      <div
        className={"container profile-container " + (darkMode ? "bg-dark" : "")}
      >
        <div className="custom-control custom-switch mt-5 mb-5">
          <input
            type="checkbox"
            checked={darkMode}
            className="custom-control-input"
            id="customSwitches"
            onChange={this.handleToggle}
          />
          <label className="custom-control-label" htmlFor="customSwitches">
            <span className={darkMode ? "text-white" : ""}>Dark Mode</span>
          </label>
        </div>
        <p className={darkMode ? "text-light" : "text-dark"}>
          Username: {currentUser.username}
        </p>
        <form
          className="edit-profile-form"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className="form-group row d-flex justify-content-center mt-5">
            <div className="col-6">
              <label
                className={"header " + (darkMode ? "text-light" : "text-dark")}
              >
                New Username
              </label>
              <input
                type="text"
                value={username}
                name="username"
                className="form-control"
                id="username"
                placeholder="New Username"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row d-flex justify-content-center mt-5">
            <div className="col-6">
              <label
                className={"header " + (darkMode ? "text-light" : "text-dark")}
              >
                Current Password
              </label>
              <input
                type="password"
                value={oldPassword}
                name="oldPassword"
                className="form-control"
                id="oldPassword"
                placeholder="Current Password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row d-flex justify-content-center mt-4">
            <div className="col-6">
              <label
                className={"header " + (darkMode ? "text-light" : "text-dark")}
              >
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                name="newPassword"
                className="form-control"
                id="newPassword"
                placeholder="New Password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          {message ? <p className="text-danger">{message}</p> : <div></div>}
          <p></p>
          <button
            type="button"
            class="save btn btn-lg btn-success mt-4"
            onClick={this.handleSave}
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
    );
  }
}
