import React, { Component } from "react";

export default class Profile extends Component {
  handleToggle = (e) => {
    const { darkMode } = this.props;
    return this.props.setDarkMode(!darkMode);
  };
  render() {
    const { darkMode } = this.props;
    return (
      <div
        className={"container profile-container " + (darkMode ? "bg-dark" : "")}
      >
        <div className="custom-control custom-switch mt-5">
          <input
            type="checkbox"
            checked={darkMode}
            className="custom-control-input"
            id="customSwitches"
            onChange={this.handleToggle}
          />
          <label className="custom-control-label" for="customSwitches">
            <span className={darkMode ? "text-white" : ""}>Dark Mode</span>
          </label>
        </div>
      </div>
    );
  }
}
