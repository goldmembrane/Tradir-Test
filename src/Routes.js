import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Pages/Home";
import BeerContainer from "./Pages/BeerContainer";
// import ReactGA from "react-ga";

const Routes = () => {

  return (
    <Router>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path='/beerlist' component={BeerContainer} />
          <Route path = '*'>
            <Redirect to = '/home'/>
          </Route>
        </Switch>
    </Router>
  );
};

export default Routes;
