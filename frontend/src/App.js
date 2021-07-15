import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import AnimeList from "./Components/AnimeList";

function App() {
  const [currentUser, setUser] = useState({});
  const [userToken, setUserToken] = useState("");

  const logOut = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar currentUser={currentUser} logOut={logOut} />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <AnimeList userToken={userToken} />}
          ></Route>
          <Route
            path="/login"
            exact
            render={() => (
              <Login setUser={setUser} setUserToken={setUserToken} />
            )}
          ></Route>
          <Route path="/profile" exact render={() => <Profile />}></Route>
          <Route
            path="/register"
            exact
            render={() => (
              <Register setUser={setUser} setUserToken={setUserToken} />
            )}
          ></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
