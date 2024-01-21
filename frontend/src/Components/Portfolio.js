import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";

class Portfolio extends Component {
  render() {
    if (!this.props.data) return null;

    const featuredEvent = this.props.data.projects[0];
    const featuredImage = "images/portfolio/" + featuredEvent.image;
    const featuredLink = featuredEvent.url;

    return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Featured Event of the Week</h1>
              <div className="featured-event" style={{ textAlign: "center" }}>
                {/* Resize image by adjusting width and height */}
                <Zmage src="https://smartcdn.gprod.postmedia.digital/montrealgazette/wp-content/uploads/2015/01/yogarave_1000_750.jpg" alt={featuredEvent.title} style={{ maxWidth: '80%', maxHeight: 'auto' }} />
                <br></br>
                <a href={featuredLink} target="_blank" rel="noopener noreferrer" className="yoga-title">Attend Yoga Rave</a>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default Portfolio;