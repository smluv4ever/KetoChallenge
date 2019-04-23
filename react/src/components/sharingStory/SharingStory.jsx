import React from "react";
import sharingStoryService from "../../services/SharingStoryService";
import SharingStoryFormik from "./SharingStoryFormik";

class SharingStory extends React.Component {
  state = {
    storyTitle: "",
    story: ""
  };

  render() {
    return (
      <SharingStoryFormik
        storyTitle={this.state.storyTitle}
        story={this.state.story}
        submit={this.submit}
      />
    );
  }
}
export default SharingStory;
