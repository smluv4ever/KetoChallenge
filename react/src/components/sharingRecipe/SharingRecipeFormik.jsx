import React from "react";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const SharingRecipeFormik = props => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        recipeId: props.recipeId,
        recipeTitle: props.recipeTitle,
        ingredients: props.ingredients,
        recipe: props.recipe,
        submitAndUpdateButton: props.submitAndUpdateButton
      }}
      validationSchema={schemas.SharingRecipeFormikValidation}
      onSubmit={(values, actions) => props.submit(values, actions)}
    >
      {({ touched, errors, values, handleSubmit }) => {
        return (
          <div>
            <Form className="form-container" onSubmit={handleSubmit}>
              {errors.recipeTitle && touched.recipeTitle && (
                <span
                  className="input-feedback pull-left"
                  stype={{ color: "red" }}
                >
                  {errors.recipeTitle}
                </span>
              )}
              <br />
              <div className="form-group">
                <Field
                  name="recipeTitle"
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={values.recipeTitle}
                />
              </div>
              {errors.ingredients && touched.ingredients && (
                <span
                  className="input-feedback pull-left"
                  stype={{ color: "red" }}
                >
                  {errors.ingredients}
                </span>
              )}
              <br />
              <div className="form-group">
                <Field
                  name="ingredients"
                  type="text"
                  className="form-control"
                  placeholder="Ingredients"
                  value={values.ingredients}
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
              <div className="form-group">
                <Field
                  name="recipe"
                  type="text"
                  component="textarea"
                  className="form-control"
                  placeholder="Type your recipe"
                  value={values.recipe}
                />
              </div>
              <div>
                <button type="submit">{props.submitAndUpdateButton}</button>
                <button
                  type="button"
                  className="pull-right"
                  onClick={props.cancel}
                >
                  Cancel
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
