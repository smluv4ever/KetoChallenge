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
            <Form className="form-group col-md-8" onSubmit={handleSubmit}>
              <div className="form-group">
                {errors.storyTitle && touched.storyTitle && (
                  <span
                    className="input-feedback pull-right"
                    style={{ color: "red" }}
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
                    style={{ color: "red" }}
                  >
                    {errors.story}
                  </span>
                )}
                <br />
                <div>
                  <Field
                    name="story"
                    type="text"
                    className="form-control textarea"
                    component="textarea"
                    placeholder="Write your story"
                    value={values.story}
                  />
                </div>
                <br />
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
              </div>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};
export default SharingStoryFormik;
