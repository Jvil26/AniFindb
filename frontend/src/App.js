import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Search from './Components/Search';
import Register from './Components/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact render={() => <Search />}></Route>
          <Route path="/login" exact render={() => <Login />}></Route>
          <Route path="/profile" exact render={() => <Profile />}></Route>
          <Route path="/register" exact render={() => <Register />}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
