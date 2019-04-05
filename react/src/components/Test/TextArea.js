import React from "react";
//STATELESS
const TextArea = props => {
  return (
    <div className="form-group">
      <label htmlFor={props.name} className="pull-left">
        {props.label}:
      </label>
      <textarea
        className="form-control"
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};
export default TextArea;
