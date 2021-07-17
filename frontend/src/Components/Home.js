import React, { Component } from "react";
import "../App.css";

export default class Home extends Component {
  render() {
    const { darkMode } = this.props;
    return (
      <div
        className={"container home-container " + (darkMode ? "bg-dark" : "")}
      >
        <p>Home</p>
      </div>
    );
  }
}
