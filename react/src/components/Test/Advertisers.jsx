import REACT from "react";
import * as helpers from "../../services/serviceHelpers";
import AdvertisersService from "../../services/AdvertisersService";
import AdvertisersForm from "./AdvertisersForm";

class Advertisers extends React.Component {
  state = {
    shortTitle: "",
    title: "",
    shortDescription: "",
    content: "",
    slug: "",
    entityTypeId: 0,
    statusId: 0,
    list: []
  };

  onChange = event => {
    const key = event.target.name;
    const val = event.target.value;
    this.setState({
      [key]: val
    });
  };

  componentDidMount() {
    AdvertisersService.AdvertisersGetAll()
      .then(this.AdvertisersGetAllSuccess)
      .catch(helpers.onGlobalError);
  }

  AdvertisersGetAllSuccess = response => {
    this.setState({
      list: response.data.item.pagedItems
    });
  };

  render() {
    return (
      <React.Fragment>
        <AdvertisersForm
          shortTitle={this.state.shortTitle}
          title={this.state.title}
          shortDescription={this.state.shortDescription}
          content={this.state.content}
          slug={this.state.slug}
          entityTypeId={this.state.entityTypeId}
          statusId={this.state.statusId}
          handleUpdateClick={this.handleUpdateClick}
          handleDeleteClick={this.handleDeleteClick}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}
export default Advertisers;
