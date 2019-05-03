import React from "react";
import * as LoginService from "../../services/LoginService";
import LoginFormik from "./LoginFormik";
import swal from "sweetalert";

class Login extends React.Component {
  state = {
    loginId: 0,
    userName: "",
    password: ""
  };

  clickSubmit = (values, actions) => {
    LoginService.CheckLogin(values)
      .then(response => this.CheckLoginSuccess(response, actions))
      .catch(error => this.CheckLoginError(error, actions));
  };

  CheckLoginSuccess = (response, actions) => {
    swal({
      title: "Congratulations!",
      text: "You successfully logged in!",
      icon: "success",
      timer: 1800,
      buttons: false,
      clasName: "swal-footer"
    });
    actions.resetForm();
    this.props.history.push("/");
  };

  CheckLoginError = (error, actions) => {
    console.log(error);
    swal("Oops!", "Failed to log in. Please try again", "error");
    actions.setSubmitting(false);
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <LoginFormik
            loginId={this.state.loginId}
            userName={this.state.userName}
            password={this.state.password}
            submit={this.clickSubmit}
          />
        </div>
      </React.Fragment>
    );
  }
}
export default Login;
