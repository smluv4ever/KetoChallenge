import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink } from "reactstrap";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import SharingStory from "./components/sharingStory/SharingStory";
import SharingRecipe from "./components/sharingRecipe/SharingRecipe";
import Home from "./components/home/Home";
import KetoNews from "./components/ketoNews/KetoNews";
import FindRecipe from "./components/findRecipe/FindRecipe";
import FileUpload from "./components/fileUpload/FileUpload";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            {/* <div className="row"> */}
            <ul className="navbar-nav">
              <li className="nav-item col-md-3">
                <NavLink className="nav-link link" tag={Link} to="/">
                  <i className="fa fa-fw fa-home" />
                  KETO CHALLENGE
                </NavLink>
              </li>
              <li className="nav-item col-md-3">
                <NavLink
                  className="nav-link link"
                  tag={Link}
                  to="/sharing_story"
                >
                  <i className="fa fa-fw fa-share" />
                  Share Story
                </NavLink>
              </li>
              <li className="nav-item col-md-3">
                <NavLink
                  className="nav-link link"
                  tag={Link}
                  to="/sharing_recipe"
                >
                  <i className="fa fa-fw fa-share" />
                  Share Recipe
                </NavLink>
              </li>
              <li className="nav-item col-md-3">
                <NavLink
                  className="nav-link link"
                  tag={Link}
                  to="/sharing_photo"
                >
                  <i className="fa fa-fw fa-image" />
                  Share Photo
                </NavLink>
              </li>
              <li className="nav-item col-md-3">
                <NavLink className="nav-link link" tag={Link} to="/find_recipe">
                  <i className="fa fa-fw fa-search" />
                  Find Recipe
                </NavLink>
              </li>
              <li className="nav-item col-md-3">
                <NavLink className="nav-link link" tag={Link} to="/keto_news">
                  <i className="fa fa-fw fa-newspaper-o" />
                  Keto News
                </NavLink>
              </li>
              <li className="nav-item offset-1 link">
                <NavLink className="nav-link" tag={Link} to="/register">
                  <i className="fa fa-fw fa-user" />
                  Register
                </NavLink>
              </li>
              <li className="nav-item link">
                <NavLink className="nav-link" tag={Link} to="/login">
                  <i className="fa fa-fw fa-user" />
                  Login
                </NavLink>
              </li>
            </ul>
            {/* </div> */}
          </nav>

          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/sharing_story" component={SharingStory} />
          <Route path="/sharing_recipe" component={SharingRecipe} />
          <Route path="/keto_news" component={KetoNews} />
          <Route path="/find_recipe" component={FindRecipe} />
          <Route path="/sharing_photo" component={FileUpload} />
        </div>
      </Router>
    );
  }
}
export default Routes;
