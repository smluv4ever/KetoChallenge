import React from "react";
import * as sharingStoryService from "../../services/SharingStoryService";
import SharingStoryFormik from "./SharingStoryFormik";
import swal from "sweetalert";

class SharingStory extends React.Component {
  state = {
    storyId: 0,
    storyTitle: "",
    story: "",
    submitAndUpdateButton: "Submit",
    storyPostings: [],
    showNewForm: false,
    showPostings: true
  };

  componentDidMount() {
    sharingStoryService
      .sharingStoryGetAll()
      .then(this.sharingStoryGetAllSuccess)
      .catch(this.sharingStoryGetAllError);
  }

  sharingStoryGetAllSuccess = response => {
    this.setState({
      storyPostings: response.items
    });
  };

  mapStoryPostings = (posting, index) => {
    return (
      <div key={index} className="align frame">
        <br />
        <p className="inside">
          <strong>Title: </strong>
          {posting.storyTitle}
        </p>
        <p className="inside">
          <strong>Story: </strong>
          {posting.story}
        </p>
        <div className="container-fluid col-md-2">
          <button
            type="button"
            className="btn btn-outline-warning"
            onClick={() => this.editStory(posting)}
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

  sharingStoryGetAllError = error => {
    swal("Oops!", "Failed to get the postings " + error, "error");
  };

  submitAndupdateStory = (values, actions) => {
    if (values.storyId) {
      sharingStoryService
        .sharingStoryUpdate(values.storyId, values)
        .then(response =>
          this.sharingStoryUpdateSuccess(response, values, actions)
        )
        .catch(error => this.sharingStoryUpdateError(error, actions));
    } else {
      sharingStoryService
        .sharingStoryPost(values)
        .then(response =>
          this.sharingStoryPostSuccess(response, values, actions)
        )
        .catch(error => {
          this.sharingStoryPostError(error, actions);
        });
    }
  };

  sharingStoryUpdateSuccess = (response, values, actions) => {
    let updateStoryPosting = [...this.state.storyPostings];
    let index = updateStoryPosting.findIndex(
      posting => posting.storyId === values.storyId
    );
    updateStoryPosting[index].storyTitle = values.storyTitle;
    updateStoryPosting[index].story = values.story;
    this.toggleNewForm();
    this.setState({
      storyId: 0,
      storyPostings: updateStoryPosting,
      submitAndUpdateButton: "Submit"
    });
    actions.resetForm(true);
    swal({
      title: "Congratulations!",
      text: "You successfully updated your story!",
      icon: "success",
      timer: 1800,
      buttons: false,
      clasName: "swal-footer"
    });
  };

  sharingStoryUpdateError = (error, actions) => {
    swal(
      "Oops!",
      "Please make sure you've entered your information correctly",
      "error"
    );
    actions.setSubmitting(false);
  };

  sharingStoryPostSuccess = (response, values, actions) => {
    let newStoryPosting = [...this.state.storyPostings];
    newStoryPosting.push({
      storyId: response.item,
      storyTitle: values.storyTitle,
      story: values.story
    });
    this.setState({
      storyPostings: newStoryPosting
    });
    this.toggleNewForm();
    actions.resetForm(true);
    swal({
      title: "Congratulations!",
      text: "You successfully posted your story!",
      icon: "success",
      timer: 1800,
      buttons: false,
      clasName: "swal-footer"
    });
  };

  sharingStoryPostError = (error, actions) => {
    swal(
      "Oops!",
      "Please make sure you've entered your information correctly",
      "error"
    );
    actions.setSubmitting(false);
  };

  editStory = posting => {
    this.toggleNewForm();
    this.setState({
      storyId: posting.storyId,
      storyTitle: posting.storyTitle,
      story: posting.story,
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
          this.deleteStory(values);
        });
      } else {
        return;
      }
    });
  };

  deleteStory = values => {
    sharingStoryService
      .sharingStoryDelete(values.storyId)
      .then(response => this.sharingStoryDeleteSuccess(response, values))
      .catch(error => this.sharingStoryDeleteError(error));
  };

  sharingStoryDeleteSuccess = (response, values) => {
    let deletePosting = [...this.state.storyPostings];
    let index = deletePosting.findIndex(
      posting => posting.storyId === values.storyId
    );
    if (index >= 0) {
      deletePosting.splice(index, 1);
      this.setState({
        storyPostings: deletePosting
      });
    }
  };

  sharingStoryDeleteError = error => {
    swal("Oops!", "Failed to delete the post " + error, "error");
  };

  toggleNewForm = () => {
    this.setState({
      storyId: 0,
      storyTitle: "",
      story: "",
      submitAndUpdateButton: "Submit",
      showNewForm: !this.state.showNewForm,
      showPostings: !this.state.showPostings
    });
  };

  render() {
    const showStoryPostings = this.state.storyPostings.map((posting, index) =>
      this.mapStoryPostings(posting, index)
    );

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-8">
              <h4 className="align">Your story can inspire others</h4>
              <button
                type="button"
                className="btn btn-outline-info align"
                onClick={this.toggleNewForm}
              >
                Post Your Story
              </button>
              <br />
              <br />
              {!this.state.showNewForm &&
                this.state.showPostings &&
                showStoryPostings}
              {this.state.showNewForm && !this.state.showPostings && (
                <SharingStoryFormik
                  storyId={this.state.storyId}
                  storyTitle={this.state.storyTitle}
                  story={this.state.story}
                  submit={this.submitAndupdateStory}
                  submitAndUpdateButton={this.state.submitAndUpdateButton}
                  cancel={this.toggleNewForm}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default SharingStory;
