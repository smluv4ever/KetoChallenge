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
            <Form className="form-group" onSubmit={handleSubmit}>
              <div className="form-group">
                {errors.recipeTitle && touched.recipeTitle && (
                  <span
                    className="input-feedback pull-right"
                    style={{ color: "red" }}
                  >
                    {errors.recipeTitle}
                  </span>
                )}
                <br />
                <Field
                  name="recipeTitle"
                  type="text"
                  className="form-control col-md-12"
                  placeholder="Title"
                  value={values.recipeTitle}
                />
              </div>
              <div className="form-group">
                {errors.ingredients && touched.ingredients && (
                  <span
                    className="input-feedback pull-right"
                    style={{ color: "red" }}
                  >
                    {errors.ingredients}
                  </span>
                )}
                <br />
                <Field
                  name="ingredients"
                  type="text"
                  component="textarea"
                  className="form-control col-md-12 mx-auto"
                  placeholder="Ingredients"
                  value={values.ingredients}
                />
              </div>
              <div className="form-group">
                {errors.recipe && touched.recipe && (
                  <span
                    className="input-feedback pull-right"
                    style={{ color: "red" }}
                  >
                    {errors.recipe}
                  </span>
                )}
                <br />
                <Field
                  name="recipe"
                  type="text"
                  component="textarea"
                  className="form-control col-md-12 mx-auto"
                  placeholder="Type your recipe"
                  value={values.recipe}
                />
              </div>
              <div>
                <button type="submit" className="btn btn-outline-success">
                  {props.submitAndUpdateButton}
                </button>
                <button
                  type="button"
                  className="pull-right btn btn-outline-danger"
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
