import React, { useState } from "react";
import AuthError from "./AuthError";
import "../App.css";

export default function Home(props) {
  const { currentUser, darkMode } = props;
  return (
    <div>
      {currentUser ? (
        <div
          className={"container home-container " + (darkMode ? "bg-dark" : "")}
        >
          <p>Home</p>
        </div>
      ) : (
        <AuthError />
      )}
    </div>
  );
}
