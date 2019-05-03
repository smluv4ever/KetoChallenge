import React from "react";
import * as FindRecipeService from "../../services/FindRecipeService";
import FindRecipeFormik from "./FindRecipeFormik";
import MapRecipeFrame from "./MapRecipeFrame";

class FindRecipe extends React.Component {
  state = {
    search: "",
    label: "",
    image: "",
    id: "",
    url: "",
    // ingredientLines: [],
    recipes: []
  };

  submitClicked = values => {
    FindRecipeService.FindRecipeGetBySearch(values.search)
      .then(this.FindRecipeGetBySearchSuccess)
      .catch(this.FindRecipeGetBySearchError);
  };

  FindRecipeGetBySearchSuccess = response => {
    this.setState({
      recipes: response.hits
    });
  };

  mapOfRecipes = (recipe, index) => (
    <MapRecipeFrame item={recipe} key={index} />
  );

  FindRecipeGetBySearchError = () => {
    alert("Was not able to find any recipe. Please try again.");
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <FindRecipeFormik
            search={this.state.search}
            submit={this.submitClicked}
            id={this.state.id}
          />
        </div>
        <div className="row">
          {this.state.recipes
            ? this.state.recipes.map(this.mapOfRecipes)
            : alert("No recipe was found with your search. Please try again")}
        </div>
      </React.Fragment>
    );
  }
}
export default FindRecipe;
