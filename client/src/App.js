import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./shared/Header/Header";
import Footer from "./shared/Footer/Footer";
import Alert from "./shared/Alert";
import Home from "./boxers/pages/Home";

import LogIn from "./users/pages/LogIn";
import SignUp from "./users/pages/SignUp";
import Dashboard from "./users/pages/Dashboard";
import CreateProfile from "./users/pages/CreateProfile";
import EditProfile from "./users/pages/EditProfile";

import BoxerProfile from "./boxers/templates/BoxerProfile";

//Redux
import { Provider } from "react-redux";
import store from "./store";

import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Alert />
        <Switch>
          <div className="main">
            <Route path="/" exact>
              <Home />
            </Route>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <Route path="/login" exact>
              <LogIn />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/profile/:id" exact>
              <BoxerProfile />
            </Route>
            <PrivateRoute
              path="/create-profile"
              exact
              component={CreateProfile}
            />
            <PrivateRoute path="/edit-profile" exact component={EditProfile} />
            <Redirect to="/" />
          </div>
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
