import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
export default class Navbar extends Component {
  render() {
    const { currentUser, logOut } = this.props;
    return (
      <div>
        {currentUser ? (
          <div>
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
              <Link exact to="/" className="navbar-brand">
                Anime
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <NavLink exact to="/" className="nav-link">
                      Animes List
                    </NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink exact to="/profile" className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink
                      exact
                      to="/login"
                      className="nav-link"
                      onClick={logOut}
                    >
                      Log Out
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        ) : (
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link exact to="/" className="navbar-brand">
              Anime
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <NavLink exact to="/" className="nav-link">
                    Anime List
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink exact to="/profile" className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink exact to="/register" className="nav-link">
                    Register
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink exact to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </div>
    );
  }
}
