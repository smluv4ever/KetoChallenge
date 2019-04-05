import * as autoLoginService from "../services/autoLogInService";

import React from "react";

class AutoLogIn extends React.PureComponent {
  componentDidMount() {
    autoLoginService
      .logIn()
      .then(this.onSuccess)
      .catch(this.onError);
  }

  onSuccess(data) {
    console.log("Test LogIn Success", data);
  }

  onError(err) {
    console.error("Test LogIn Failed", err);
  }

  render = () => null;
}

export default AutoLogIn;
