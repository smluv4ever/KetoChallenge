import React from "react";
import RegisterService from "../../services/RegisterService";
import RegisterFormik from "./RegisterFormik";
import swal from "sweetalert";

class Register extends React.Component {
  state = {
    registerId: 0,
    userName: "",
    password: "",
    confirmPassword: ""
  };

  clickSubmit = (values, actions) => {
    RegisterService.RegisterPost(values)
      .then(response => this.registerPostSuccess(response, values, actions))
      .catch(error => this.registerPostError(error, actions));
  };

  registerPostSuccess = (response, values, actions) => {
    swal({
      title: "Congratulations!",
      text: "You successfully registered!",
      icon: "success",
      timer: 1800,
      buttons: false,
      clasName: "swal-footer"
    });
    actions.resetForm();
  };

  registerPostError = (error, actions) => {
    swal("Oops!", "Failed to register. Please try again", "error");
    actions.setSubmitting(false);
  };

  render() {
    return (
      <React.Fragment>
        <RegisterFormik
          registerId={this.state.registerId}
          userName={this.state.userName}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          submit={this.clickSubmit}
        />
      </React.Fragment>
    );
  }
}
export default Register;
