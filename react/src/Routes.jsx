import React from "react";
import { Router, Route, Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import SharingStory from "./components/sharingStory/SharingStory";
import SharingRecipe from "./components/sharingRecipe/SharingRecipe";
import FindRecipe from "./components/findRecipe/FindRecipe";

const Routes = () => {
  <Router>
    <div>
      <Nav pills>
        <NavItem>
          <NavLink tag={Link} to="/">
            Home
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
            Find Food
          </NavLink>
        </NavItem>
      </Nav>

      <Route exact path="/sharing_story" component={SharingStory} />
      <Route exact path="/sharing_recipe" component={SharingRecipe} />
      <Route exact path="/find_recipe" component={FindRecipe} />
    </div>
  </Router>;
};
export default Routes;
