import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";

import Login from "./Components/Auth-Views/Login";
import Navbar from "./Components/Main-Views/Navbar";
import Profile from "./Components/Main-Views/Profile";
import Register from "./Components/Auth-Views/Register";
import AnimeList from "./Components/Main-Views/AnimeList";
import AnimeDetails from "./Components/Details-Views/AnimeDetails";
import ResetPassword from "./Components/Auth-Views/Reset-Password";
import MangaList from "./Components/Main-Views/MangaList";
import MangaDetails from "./Components/Details-Views/MangaDetails";
import CharList from "./Components/Main-Views/CharList";
import CharDetails from "./Components/Details-Views/CharDetails";
import Home from "./Components/Main-Views/Home";
import EmailConfirmation from "./Components/Auth-Views/EmailConfirmation";
import Favorites from "./Components/Main-Views/Favorites";

import UserContext from "./UserContext";
import SetUserContext from "./SetUserContext";

function App() {
  const [currentUser, setUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);

  const logOut = () => {
    setUser(null);
    setUserToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    setLoading(true);
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
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
            <UserContext.Provider
              value={
                typeof currentUser === "string"
                  ? JSON.parse(currentUser)
                  : currentUser
              }
            >
              <SetUserContext.Provider value={setUser}>
                <Route
                  path="/"
                  exact
                  render={() => <Home currentUser={currentUser} />}
                ></Route>
                <Route
                  path="/favorites"
                  exact
                  render={() => (
                    <Favorites
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
                  path="/anime-list"
                  exact
                  render={() => (
                    <AnimeList
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
                  render={() => <Login setUserToken={setUserToken} />}
                ></Route>
                <Route path="/profile" exact render={() => <Profile />}></Route>
                <Route
                  path="/register"
                  exact
                  render={() => <Register setUserToken={setUserToken} />}
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
                  render={() => <ResetPassword />}
                ></Route>
                <Route
                  path="/email-confirmation"
                  exact
                  render={() => <EmailConfirmation />}
                ></Route>
              </SetUserContext.Provider>
            </UserContext.Provider>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
