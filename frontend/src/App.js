import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";

import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import AnimeList from "./Components/AnimeList";
import AnimeDetails from "./Components/AnimeDetails";
import ResetPassword from "./Components/Reset-Password";

function App() {
  const [currentUser, setUser] = useState({});
  const [userToken, setUserToken] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const logOut = () => {
    setUser(null);
    setUserToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);
    if (user && accessToken) {
      setUser(user);
      setUserToken(accessToken);
    }
    setLoading(false);
  }, [currentUser, userToken]);

  return (
    <div className="App">
      {loading ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <BrowserRouter>
          <Navbar currentUser={currentUser} logOut={logOut} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <AnimeList darkMode={darkMode} userToken={userToken} />
              )}
            ></Route>
            <Route
              path="/login"
              exact
              render={() => (
                <Login setUser={setUser} setUserToken={setUserToken} />
              )}
            ></Route>
            <Route
              path="/profile"
              exact
              render={() => (
                <Profile
                  darkMode={darkMode}
                  currentUser={JSON.parse(currentUser)}
                  setDarkMode={setDarkMode}
                />
              )}
            ></Route>
            <Route
              path="/register"
              exact
              render={() => (
                <Register setUser={setUser} setUserToken={setUserToken} />
              )}
            ></Route>
            <Route
              path="/anime-details/:id"
              exact
              render={(props) => (
                <AnimeDetails
                  {...props}
                  darkMode={darkMode}
                  userToken={userToken}
                />
              )}
            ></Route>
            <Route
              path="/reset-password"
              exact
              render={() => (
                <ResetPassword setUser={setUser} setUserToken={setUserToken} />
              )}
            ></Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
