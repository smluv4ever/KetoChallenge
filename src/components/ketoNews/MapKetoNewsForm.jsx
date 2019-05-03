import React from "react";

const MapKetoNewsForm = props => {
  return (
    <div
      className="card container-fluid col-md-3 cardFrame"
      style={{ width: "18rem" }}
      key={props.item.key}
    >
      <a href={props.item.kbThumLink}>
        <img
          className="card-img-top"
          src={props.item.image}
          alt="Image Not Found"
        />
      </a>
      <div className="card-body">
        <a href={props.item.kbThumLink}>{props.item.title}</a>
      </div>
    </div>
  );
};
export default MapKetoNewsForm;
