import "./App.css";
import "./services/autoLogInService.js";
import React, { Component } from "react";
import logo from "./logo.svg";
import { withRouter } from "react-router-dom";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Routes />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React with Sabio
          </a> */}
        </header>
      </div>
    );
  }
}

export default withRouter(App);
