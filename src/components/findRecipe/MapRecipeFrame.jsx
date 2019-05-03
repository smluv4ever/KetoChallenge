import React from "react";
import MapRecipeIngreidnetLines from "./MapRecipeIngredientLines";

const MapRecipeFrame = props => {
  const mapOfIngredientLines = (ingredientLine, index) => (
    <MapRecipeIngreidnetLines item={ingredientLine} key={index} />
  );

  return (
    <div
      className="card container-fluid recipeFrame"
      // style={{ width: "18rem" }}
    >
      {/* <div className="row"> */}
      <div className="col=md-12">
        <a href={props.item.recipe.url}>
          <img
            className="card-img-top"
            src={props.item.recipe.image}
            alt="Image not found"
          />
        </a>
        <div className="card-body">
          <a href={props.item.recipe.url}>
            <h5 className="card-title">{props.item.recipe.label}</h5>
          </a>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {props.item.recipe.ingredientLines.map(mapOfIngredientLines)}
          </li>
        </ul>
      </div>
    </div>
    // </div>
  );
};

export default MapRecipeFrame;
