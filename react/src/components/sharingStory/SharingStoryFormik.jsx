import React from "react";
import { Formik, Form, Field } from "formik";
import * as schemas from "../schemas/FormikValidationSchema";

const SharingStoryFormik = props => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        storyId: props.storyId,
        storyTitle: props.storyTitle,
        story: props.story,
        submitAndUpdateButton: props.submitAndUpdateButton
      }}
      validationSchema={schemas.SharingStoryFormikValidation}
      onSubmit={(values, actions) => props.submit(values, actions)}
    >
      {({ touched, errors, values, handleSubmit }) => {
        return (
          <div>
            <Form className="form-group" onSubmit={handleSubmit}>
              {errors.storyTitle && touched.storyTitle && (
                <span
                  className="input-feedback pull-left"
                  stype={{ color: "red" }}
                >
                  {errors.storyTitle}
                </span>
              )}
              <br />
              <div>
                <Field
                  name="storyTitle"
                  type="text"
                  className="form-control"
                  placeholder="Title"
                  value={values.storyTitle}
                />
              </div>
              {errors.story && touched.story && (
                <span
                  className="input-feedback pull-right"
                  stype={{ color: "red" }}
                >
                  {errors.story}
                </span>
              )}
              <br />
              <div>
                <Field
                  name="story"
                  type="text"
                  className="form-control"
                  component="textarea"
                  placeholder="Type your story"
                  value={values.story}
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
export default SharingStoryFormik;
