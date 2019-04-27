import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import SharingStory from "./components/sharingStory/SharingStory";
import SharingRecipe from "./components/sharingRecipe/SharingRecipe";
// import FindRecipe from "./components/findRecipe/FindRecipe";

const Routes = () => (
  <Router>
    <div>
      <Nav pills>
        <NavItem>
          <NavLink tag={Link} to="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/register">
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/login">
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/sharing_story">
            Share Story
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/sharing_recipe">
            Share Recipe
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/find_recipe">
            Find Recipe
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/motivation">
            Motivation
          </NavLink>
        </NavItem>
      </Nav>

      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/sharing_story" component={SharingStory} />
      <Route path="/sharing_recipe" component={SharingRecipe} />
      {/* <Route exact path="/find_recipe" component={FindRecipe} /> */}
    </div>
  </Router>
);
export default Routes;
