import React from "react";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const LoginFormik = props => {
  return (
    <div className="container">
      <Formik
        enableReinitialize={true}
        initialValues={{
          registerId: props.registerId,
          userName: props.userName,
          password: props.password
        }}
        validationSchema={schemas.LoginFormikValidation}
        onSubmit={(values, actions) => props.submit(values, actions)}
      >
        {({ touched, errors, values, handleSubmit }) => {
          return (
            <div>
              <Form
                className="form-container loginForm"
                onSubmit={handleSubmit}
              >
                <span className="col-md-6 offset-2">Username: </span>
                {errors.userName && touched.userName && (
                  <span className="required" style={{ color: "red" }}>
                    {errors.userName}
                  </span>
                )}
                <br />
                <div className="form-group">
                  <Field
                    name="userName"
                    type="text"
                    className="form-control col-md-6 offset-2"
                    value={values.userName}
                  />
                </div>
                <span className="col-md-6 offset-2">Password: </span>
                {errors.password && touched.password && (
                  <span className="required" style={{ color: "red" }}>
                    {errors.password}
                  </span>
                )}
                <br />
                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    className="form-control col-md-6 offset-2"
                    value={values.password}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-outline-secondary col-md-6 offset-2"
                  >
                    Login
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default LoginFormik;
