import React from "react";
import TextInput from "./TextInput";
import TextArea from "./TextArea";

const AdvertisersForm = props => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-6">
          <TextInput
            name="shortTitle"
            label="shortTitle"
            type="text"
            value={props.shortTitle}
            placeholder="Short Title"
            onChange={props.onChange}
          />
          <TextInput
            name="title"
            label="title"
            type="text"
            value={props.title}
            placeholder="title"
            onChange={props.onChange}
          />
          <TextInput
            name="shortDescription"
            label="shortDescription"
            type="number"
            value={props.shortDescription}
            placeholder="Short Description"
            onChange={props.onChange}
          />
          <TextArea
            name="content"
            label="content"
            type="text"
            value={props.content}
            placeholder="content"
            onChange={props.onChange}
          />
          <TextInput
            name="slug"
            label="Slug"
            type="text"
            value={props.slug}
            placeholder="Slug"
            onChange={props.onChange}
          />
          <TextInput
            name="entityTypeId"
            label="entityTypeId"
            type="text"
            value={props.entityTypeId}
            placeholder="entity Type Id"
            onChange={props.onChange}
          />
          <TextInput
            name="statusId"
            label="statusId"
            type="text"
            value={props.statusId}
            placeholder="Status Id"
            onChange={props.onChange}
          />
          <button
            type="button"
            onClick={props.handleUpdateClick}
            disabled={props.disabled}
            className="btn btn-primary"
          >
            Update
          </button>
          <button
            type="button"
            onClick={props.handleDeleteClick}
            disabled={props.disabled}
            className="btn btn-primary"
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdvertisersForm;
