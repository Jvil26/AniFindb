import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";

import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import AnimeList from "./Components/AnimeList";
import AnimeDetails from "./Components/AnimeDetails";
import ResetPassword from "./Components/Reset-Password";
import MangaList from "./Components/MangaList";
import MangaDetails from "./Components/MangaDetails";
import CharList from "./Components/CharList";
import CharDetails from "./Components/CharDetails";
import Home from "./Components/Home";

function App() {
  const [currentUser, setUser] = useState({});
  const [userToken, setUserToken] = useState("");
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
  }, []);

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
              render={() => <Home currentUser={currentUser} />}
            ></Route>
            <Route
              path="/anime-list"
              exact
              render={() => (
                <AnimeList
                  dark_mode={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser).dark_mode
                      : currentUser.dark_mode
                  }
                  currentUser={currentUser}
                  userToken={userToken}
                />
              )}
            ></Route>
            <Route
              path="/manga-list"
              exact
              render={() => (
                <MangaList
                  dark_mode={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser).dark_mode
                      : currentUser.dark_mode
                  }
                  userToken={userToken}
                />
              )}
            ></Route>
            <Route
              path="/character-list"
              exact
              render={() => (
                <CharList
                  dark_mode={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser).dark_mode
                      : currentUser.dark_mode
                  }
                  userToken={userToken}
                />
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
                  currentUser={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser)
                      : currentUser
                  }
                  setUser={setUser}
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
              path="/anime-details/:id/:title"
              exact
              render={(props) => (
                <AnimeDetails
                  {...props}
                  dark_mode={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser).dark_mode
                      : currentUser.dark_mode
                  }
                  userToken={userToken}
                />
              )}
            ></Route>
            <Route
              path="/manga-details/:id/:title"
              exact
              render={(props) => (
                <MangaDetails
                  {...props}
                  dark_mode={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser).dark_mode
                      : currentUser.dark_mode
                  }
                  userToken={userToken}
                />
              )}
            ></Route>
            <Route
              path="/character-details/:id/:title"
              exact
              render={(props) => (
                <CharDetails
                  {...props}
                  dark_mode={
                    typeof currentUser === "string"
                      ? JSON.parse(currentUser).dark_mode
                      : currentUser.dark_mode
                  }
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
