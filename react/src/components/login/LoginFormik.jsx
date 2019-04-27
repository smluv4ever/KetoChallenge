import React from "react";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const LoginFormik = props => {
  return (
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
            <Form className="form-container" onSubmit={handleSubmit}>
              {errors.userName && touched.userName && (
                <span
                  className="input-feedback pull-left"
                  stype={{ color: "red" }}
                >
                  {errors.userName}
                </span>
              )}
              <br />
              <div className="form-group">
                <span>Username: </span>
                <Field
                  name="userName"
                  type="text"
                  className="form-control"
                  value={values.userName}
                />
              </div>
              {errors.password && touched.password && (
                <span
                  className="input-feedback pull-left"
                  stype={{ color: "red" }}
                >
                  {errors.password}
                </span>
              )}
              <br />
              <div className="form-group">
                <span>Password: </span>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  value={values.password}
                />
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default LoginFormik;
