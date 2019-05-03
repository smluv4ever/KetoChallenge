import React from "react";
import * as KetoNewsService from "../../services/KetoNewsService";
import MapKetoNewsForm from "./MapKetoNewsForm";

class KetoNews extends React.Component {
  state = {
    ketoNews: [],
    kbThumLink: "",
    title: "",
    image: "",
    postid: ""
  };
  componentDidMount() {
    KetoNewsService.KetoNewsGetAll()
      .then(this.KetoNewsGetAllSuccess)
      .catch(this.KetoNewsGetAllError);
  }

  KetoNewsGetAllSuccess = response => {
    this.setState({
      ketoNews: response.items
    });
  };

  mapKetoNews = (news, index) => <MapKetoNewsForm item={news} key={index} />;

  render() {
    const listOfKetoNews = this.state.ketoNews.map((news, index) =>
      this.mapKetoNews(news, index)
    );
    return <div className="row">{listOfKetoNews}</div>;
  }
}
export default KetoNews;
