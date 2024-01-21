// import React, { Component } from "react";
// import Fade from "react-reveal";

// class About extends Component {
//   render() {
//     if (!this.props.data) return null;

//     const name = this.props.data.name;
//     const profilepic = "images/" + this.props.data.image;
//     const bio = this.props.data.bio;
//     const street = this.props.data.address.street;
//     const city = this.props.data.address.city;
//     const state = this.props.data.address.state;
//     const zip = this.props.data.address.zip;
//     const phone = this.props.data.phone;
//     const email = this.props.data.email;
//     const resumeDownload = this.props.data.resumedownload;

//     return (
//       <section id="about">
//         <Fade duration={1000}>
//           <div className="row">
//             <div className="three columns">
//               <img
//                 className="profile-pic"
//                 src={profilepic}
//                 alt="Nordic Giant Profile Pic"
//               />
//             </div>
//             <div className="nine columns main-col">
//               <h2>About Me</h2>

//               <p>{bio}</p>
//               <div className="row">
//                 <div className="columns contact-details">
//                   <h2>Contact Details</h2>
//                   <p className="address">
//                     <span>{name}</span>
//                     <br />
//                     <span>
//                       {street}
//                       <br />
//                       {city} {state}, {zip}
//                     </span>
//                     <br />
//                     <span>{phone}</span>
//                     <br />
//                     <span>{email}</span>
//                   </p>
//                 </div>
//                 <div className="columns download">
//                   <p>
//                     <a href={resumeDownload} className="button">
//                       <i className="fa fa-download"></i>Download Resume
//                     </a>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Fade>
//       </section>
//     );
//   }
// }

// export default About;

// ----- CURRENT WORKING TOP
// import React, { Component } from "react";
// import Fade from "react-reveal";
// import Day from './Day'; // Import Day component
// import './Calendar.css'; // Import Calendar CSS

// class About extends Component {
//   render() {
//     // Define the days of the week for the calendar
//     const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

//     return (
//       <section id="about">
//         <Fade duration={1000}>
//           <div className="row">
//             <div className="twelve columns">
//               <div>
//                 <h2 className="calendar-title">JANUARY 2024</h2>
//                 <div className="calendar">
//                   {days.map(day => <Day key={day} dayName={day} />)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </Fade>
//       </section>
//     );
//   }
// }

// export default About;
// ---- CURRENT WORKING BOTTOM

import React, { Component } from "react";
import Fade from "react-reveal";
import Day from "./Day";
import "./Calendar.css";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekData: {}, // Empty object for the fetched data
      weeksFromToday: 0, // Current week offset from the current date
    };
  }

  componentDidMount() {
    this.fetchWeekData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.weeksFromToday !== this.state.weeksFromToday) {
      this.fetchWeekData();
    }
  }

  fetchWeekData = () => {
    fetch(
      `http://localhost:3000/api/getWeek?weeksFromToday=${this.state.weeksFromToday}`
    )
      .then((response) => response.json())
      .then((data) => {
        const transformedData = this.transformEventData(data);
        console.log(transformedData);
        this.setState({ weekData: transformedData });
      })
      .catch((error) => console.error("Error fetching week data:", error));
  };

  goToNextWeek = () => {
    this.setState((prevState) => ({
      weeksFromToday: prevState.weeksFromToday + 1,
    }));
  };

  goToPreviousWeek = () => {
    this.setState((prevState) => ({
      weeksFromToday: prevState.weeksFromToday - 1,
    }));
  };

  transformEventData(data) {
    let transformedData = {};
    for (let day in data) {
      // Check if the day's data is an array
      if (Array.isArray(data[day])) {
        transformedData[day] = data[day]; // Already an array, use as is
      } else if (data[day] && typeof data[day] === "object") {
        // If it's an object, put it into an array
        transformedData[day] = [data[day]];
      } else {
        // If it's neither an array nor an object, use an empty array
        transformedData[day] = [];
      }
    }
    return transformedData;
  }
  
  // truncateText(text, max_length = 85) {
  //   if (text.length > max_length) {
  //     return text.slice(0, max_length - 3) + "...";
  //   }
  //   return text;
  // }

  render() {
    const { weekData } = this.state;

    console.log({ weekData });

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="twelve columns">
              <div className="week-navigation">
                <button
                  onClick={this.goToPreviousWeek}
                  className="week-button"
                  id="prev_button"
                >
                  &#8592; Previous Week
                </button>
                <h2 className="calendar-title">JANUARY 2024</h2>
                <button
                  onClick={this.goToNextWeek}
                  className="week-button"
                  id="next_button"
                >
                  Next Week &#8594;
                </button>
              </div>
              <div className="calendar">
                {Object.keys(weekData).length > 0 ? (
                  Object.keys(weekData).map((day) => (
                    <Day key={day} dayName={day} events={weekData[day]} />
                  ))
                ) : (
                  <p>Loading events...</p>
                )}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;
