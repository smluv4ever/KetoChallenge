import React from "react";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const SharingRecipeFormik = props => {
  return (
    <Formik
      enableReinitialize={true}
      onSubmit={props.handleSubmit}
      initialValues={{
        recipeTitle: props.recipeTitle,
        recipe: props.recipe
      }}
      validationSchema={schemas.SharingRecipeFormikValidation}
      onSubmit={(values, actions) => props.submit(values, actions)}
    >
      {({ touched, errors, values, handleSubmit }) => {
        return (
          <div>
            <Form className="form-group" onSubmit={handleSubmit}>
              {errors.recipeTitle && touched.recipeTitle && (
                <span
                  className="input-feedback pull-left"
                  stype={{ color: "red" }}
                >
                  {errors.recipeTitle}
                </span>
              )}
              <br />
              <div>
                <Field
                  name="recipeTitle"
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={values.recipeTitle}
                />
              </div>
              {errors.recipe && touched.recipe && (
                <span
                  className="input-feedback pull-right"
                  stype={{ color: "red" }}
                >
                  {errors.recipe}
                </span>
              )}
              <br />
              <div>
                <Field
                  name="recipe"
                  type="text"
                  component="textarea"
                  placeholder="Type your recipe"
                  value={values.recipe}
                />
              </div>
              <div>
                <button type="submit" classname="pull-left">
                  Submit
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default SharingRecipeFormik;
