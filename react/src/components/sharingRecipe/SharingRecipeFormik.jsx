import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const SharingRecipeFormik = props => {
  return (
    <Formik
      enableReinitialize={true}
      onSubmit={props.handleSubmit}
      initialValues={{
        recipeId: props.recipeId,
        recipeTitle: props.recipeTitle,
        recipe: props.recipe,
        submitAndUpdateButton: props.submitAndUpdateButton
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
                  {props.submitAndUpdateButton}
                </button>
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
SharingRecipeFormik.propTypes = {
  recipeId: PropTypes.number,
  recipeTitle: PropTypes.string,
  recipe: PropTypes.string,
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  submitAndUpdateButton: PropTypes.string,
  submit: PropTypes.func
};
export default SharingRecipeFormik;
