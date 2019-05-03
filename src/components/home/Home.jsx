import React from "react";

class Home extends React.Component {
  render() {
    return (
      <div>
        <img
          className="home-bg"
          src="https://blog.bulletproof.com/wp-content/uploads/2018/12/Ketogenic-Diet-for-Beginners_header-752x401.jpg"
          alt="Home Background"
        />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2" />
            <div className="text center col-md-8">
              <h1>
                Eat Healthy, <br />
                Stay Healthy
              </h1>
              <br />
              <p>
                The <strong>KETOGENIC DIET</strong> is a very low-carb, high-fat
                diet that shares many similarities with the Atkins and low-carb
                diets.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
