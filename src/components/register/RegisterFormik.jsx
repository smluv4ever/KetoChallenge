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
              <Form
                className="form-container registerForm"
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
                <span className="col-md-6 offset-2">Confirm Password: </span>
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="confirmPassword" style={{ color: "red" }}>
                    {errors.confirmPassword}
                  </span>
                )}
                <br />
                <div className="form-group">
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="form-control col-md-6 offset-2"
                    value={values.confirmPassword}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="btn btn-outline-secondary col-md-6 offset-2"
                  >
                    Register
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
export default RegisterFormik;
