import React from "react";
import * as SharingRecipeService from "../../services/SharingRecipeService";
import SharingRecipeFormik from "./SharingRecipeFormik";
import swal from "sweetalert";

class SharingRecipe extends React.Component {
  state = {
    recipeId: 0,
    recipeTitle: "",
    ingredients: "",
    recipe: "",
    submitAndUpdateButton: "Submit",
    recipePostings: [],
    showNewForm: false,
    showPostings: true
  };

  componentDidMount() {
    SharingRecipeService.sharingRecipeGetAll()
      .then(this.sharingRecipeGetAllSuccess)
      .catch(this.sharingRecipeGetAllError);
  }

  sharingRecipeGetAllSuccess = response => {
    this.setState({
      recipePostings: response.items
    });
  };

  mapRecipePostings = (posting, index) => {
    return (
      <div key={index} className="frame">
        <p className="inside">
          <strong>Title: </strong>
          {posting.recipeTitle}
        </p>
        <p className="inside">
          <strong>Ingredients: </strong>
          {posting.ingredients}
        </p>
        <p className="inside">
          <strong>Story: </strong>
          {posting.recipe}
        </p>
        <div className="container-fluid col-md-2">
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => this.editRecipe(posting)}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger pull-right"
            onClick={() => this.deleteWarning(posting)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  sharingRecipeGetAllError = error => {
    swal("Oops!", "Failed to get the postings " + error, "error");
  };

  submitAndupdateRecipe = (values, actions) => {
    if (values.recipeId) {
      SharingRecipeService.sharingRecipeUpdate(values.recipeId, values)
        .then(response =>
          this.sharingRecipeUpdateSuccess(response, values, actions)
        )
        .catch(error => this.sharingRecipeUpdateError(error, actions));
    } else {
      SharingRecipeService.sharingRecipePost(values)
        .then(response =>
          this.sharingRecipePostSuccess(response, values, actions)
        )
        .catch(error => {
          this.sharingRecipePostError(error, actions);
        });
    }
  };

  sharingRecipeUpdateSuccess = (response, values, actions) => {
    let updateRecipePosting = [...this.state.recipePostings];
    let index = updateRecipePosting.findIndex(
      posting => posting.recipeId === values.recipeId
    );
    updateRecipePosting[index].recipeTitle = values.recipeTitle;
    updateRecipePosting[index].ingredients = values.ingredients;
    updateRecipePosting[index].recipe = values.recipe;
    this.toggleNewForm();
    this.setState({
      recipeId: 0,
      recipePostings: updateRecipePosting,
      submitAndUpdateButton: "Submit"
    });
    actions.resetForm(true);
    swal({
      title: "Congratulations!",
      text: "You successfully updated your recipe!",
      icon: "success",
      timer: 1800,
      buttons: false,
      clasName: "swal-footer"
    });
  };

  sharingRecipeUpdateError = (error, actions) => {
    swal(
      "Oops!",
      "Please make sure you've entered your information correctly",
      "error"
    );
    actions.setSubmitting(false);
  };

  sharingRecipePostSuccess = (response, values, actions) => {
    let newRecipePosting = [...this.state.recipePostings];
    newRecipePosting.push({
      recipeId: response.item,
      recipeTitle: values.recipeTitle,
      ingredients: values.ingredients,
      recipe: values.recipe
    });
    this.setState({
      recipePostings: newRecipePosting
    });
    this.toggleNewForm();
    actions.resetForm(true);
    swal({
      title: "Congratulations!",
      text: "You successfully posted your recipe!",
      icon: "success",
      timer: 1800,
      buttons: false,
      clasName: "swal-footer"
    });
  };

  sharingRecipePostError = (error, actions) => {
    swal(
      "Oops!",
      "Please make sure you've entered your information correctly",
      "error"
    );
    actions.setSubmitting(false);
  };

  editRecipe = posting => {
    this.toggleNewForm();
    this.setState({
      recipeId: posting.recipeId,
      recipeTitle: posting.recipeTitle,
      ingredients: posting.ingredients,
      recipe: posting.recipe,
      submitAndUpdateButton: "Update"
    });
  };

  deleteWarning = values => {
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this section",
      icon: "warning",
      buttons: ["Cancel", "Yes, I am sure!"],
      dangerMode: true
    }).then(isConfirm => {
      if (isConfirm) {
        swal({
          title: "Deleted",
          icon: "success",
          timer: 1425,
          buttons: false,
          className: "swal-footer"
        }).then(() => {
          this.deleteRecipe(values);
        });
      } else {
        return;
      }
    });
  };

  deleteRecipe = values => {
    SharingRecipeService.sharingRecipeDelete(values.recipeId)
      .then(response => this.sharingRecipeDeleteSuccess(response, values))
      .catch(error => this.sharingRecipeDeleteError(error));
  };

  sharingRecipeDeleteSuccess = (response, values) => {
    let deletePosting = [...this.state.recipePostings];
    let index = deletePosting.findIndex(
      posting => posting.recipeId === values.recipeId
    );
    if (index >= 0) {
      deletePosting.splice(index, 1);
      this.setState({
        recipePostings: deletePosting
      });
    }
  };

  sharingRecipeDeleteError = error => {
    swal("Oops!", "Failed to delete the post " + error, "error");
  };

  toggleNewForm = () => {
    this.setState({
      recipeId: 0,
      recipeTitle: "",
      ingredients: "",
      recipe: "",
      submitAndUpdateButton: "Submit",
      showNewForm: !this.state.showNewForm,
      showPostings: !this.state.showPostings
    });
  };

  render() {
    const showRecipePostings = this.state.recipePostings.map((posting, index) =>
      this.mapRecipePostings(posting, index)
    );

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-8">
              <h4 className="align">Share Your Unique Recipe!</h4>
              <button
                type="button"
                className="btn btn-outline-primary align"
                onClick={this.toggleNewForm}
              >
                New Recipe
              </button>
              {this.state.showNewForm && !this.state.showPostings && (
                <div className="container">
                  <SharingRecipeFormik
                    recipeId={this.state.recipeId}
                    recipeTitle={this.state.recipeTitle}
                    ingredients={this.state.ingredients}
                    recipe={this.state.recipe}
                    submit={this.submitAndupdateRecipe}
                    submitAndUpdateButton={this.state.submitAndUpdateButton}
                    cancel={this.toggleNewForm}
                  />
                </div>
              )}
              <div className="align">
                {!this.state.showNewForm &&
                  this.state.showPostings &&
                  showRecipePostings}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SharingRecipe;
