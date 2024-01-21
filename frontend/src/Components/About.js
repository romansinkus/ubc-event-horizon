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
import Day from './Day';
import './Calendar.css';

class About extends Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {
      weekData: {}, // Empty object for the fetched data
    };
  }

  componentDidMount() {
    // Fetch data when the component mounts
    fetch('http://localhost:3000/api/getWeek')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Transform the data to match the expected format
        const formattedData = this.transformEventData(data);
        this.setState({ weekData: formattedData });
      })
      .catch(error => {
        console.error('Fetch error:', error);
        // Handle the error state as needed
      });
  }

  transformEventData(data) {
    let transformedData = {};
    for (let day in data) {
      if (!data[day] || Object.keys(data[day]).length === 0) {
        // No events for this day
        transformedData[day] = [];
      } else {
        // Format the event data for this day
        // Since the data for each day is an object, not an array, wrap it in an array
        transformedData[day] = [data[day]].map(event => ({
          data1: event['Event Title'],
          // Add other details as needed
        }));
      }
    }
    return transformedData;
  }
  

  render() {
    const { weekData } = this.state;

    return (
      <section id="about">
        <Fade duration={1000}>
          <div className="row">
            <div className="twelve columns">
              <div>
                <h2 className="calendar-title">JANUARY 2024</h2>
                <div className="calendar">
                  {Object.keys(weekData).length > 0 ? (
                    Object.keys(weekData).map(day => (
                      <Day key={day} dayName={day} events={weekData[day]} />
                    ))
                  ) : (
                    <p>Loading events...</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </section>
    );
  }
}

export default About;

