import React from "react";
import { Formik, Form, Field } from "formik";

const FindRecipeFormik = props => {
  return (
    <div className="container">
      <Formik
        enableReinitialize={true}
        initialValues={{
          search: props.search,
          id: props.id
        }}
        onSubmit={values => props.submit(values)}
      >
        {({ values, handleSubmit }) => {
          return (
            <div className="container-fluid">
              <Form
                className="form-container loginForm"
                onSubmit={handleSubmit}
              >
                <span className="col-md-6 offset-2">
                  What are you looking for?{" "}
                </span>
                <br />
                {/* <div className="form-group"> */}
                <Field
                  name="search"
                  type="text"
                  className="form-control col-md-6 offset-2"
                  value={values.search}
                />
                {/* </div> */}
                <button
                  type="submit"
                  className="btn btn-outline-secondary col-md-6 offset-2"
                >
                  Search
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
export default FindRecipeFormik;
