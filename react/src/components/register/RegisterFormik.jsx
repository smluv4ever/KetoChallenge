import React from "react";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const RegisterFormik = props => {
  return (
    <div className="container">
      <Formik
        enableReinitialize={true}
        initialValues={{
          registerId: props.registerId,
          userName: props.userName,
          password: props.password,
          confirmPassword: props.confirmPassword
        }}
        validationSchema={schemas.RegisterFormikValidation}
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
                {errors.confirmPassword && touched.confirmPassword && (
                  <span
                    className="input-feedback pull-left"
                    stype={{ color: "red" }}
                  >
                    {errors.confirmPassword}
                  </span>
                )}
                <br />
                <div className="form-group">
                  <span>Confirm Password: </span>
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control"
                    value={values.confirmPassword}
                  />
                </div>
                <div>
                  <button type="submit">Register</button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default RegisterFormik;
