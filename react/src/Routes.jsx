import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import { Nav, NavItem, NavLink } from "reactstrap";
import SharingStory from "./components/sharingStory/SharingStory";
import SharingRecipe from "./components/sharingRecipe/SharingRecipe";
// import FindRecipe from "./components/findRecipe/FindRecipe";

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sharing_story">Share Story</Link>
        </li>
        <li>
          <Link to="/sharing_recipe">Share Recipe</Link>
        </li>
        {/* <li>
            <Link to="/find_recipe">Find Recipe</Link>
            </li>
            <li>
            <Link to="/motivation">Motivation</Link>
            </li> */}
      </ul>

      <Route path="/sharing_story" component={SharingStory} />
      <Route path="/sharing_recipe" component={SharingRecipe} />
      {/* <Route exact path="/find_recipe" component={FindRecipe} /> */}
    </div>
  </Router>
);
export default Routes;
