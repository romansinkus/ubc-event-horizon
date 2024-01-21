// import React, { Component } from "react";
// import Slide from "react-reveal";

// class Resume extends Component {
//   getRandomColor() {
//     let letters = "0123456789ABCDEF";
//     let color = "#";
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

//   render() {
//     if (!this.props.data) return null;

//     const skillmessage = this.props.data.skillmessage;
//     const education = this.props.data.education.map(function (education) {
//       return (
//         <div key={education.school}>
//           <h3>{education.school}</h3>
//           <p className="info">
//             {education.degree} <span>&bull;</span>
//             <em className="date">{education.graduated}</em>
//           </p>
//           <p>{education.description}</p>
//         </div>
//       );
//     });

//     const work = this.props.data.work.map(function (work) {
//       return (
//         <div key={work.company}>
//           <h3>{work.company}</h3>
//           <p className="info">
//             {work.title}
//             <span>&bull;</span> <em className="date">{work.years}</em>
//           </p>
//           <p>{work.description}</p>
//         </div>
//       );
//     });

//     const skills = this.props.data.skills.map((skills) => {
//       const backgroundColor = this.getRandomColor();
//       const className = "bar-expand " + skills.name.toLowerCase();
//       const width = skills.level;

//       return (
//         <li key={skills.name}>
//           <span style={{ width, backgroundColor }} className={className}></span>
//           <em>{skills.name}</em>
//         </li>
//       );
//

//     return (
//       <section id="resume">
//         <Slide left duration={1300}>
//           <div className="row education">
//             <div className="three columns header-col">
//               <h1>
//                 <span>Education</span>
//               </h1>
//             </div>

//             <div className="nine columns main-col">
//               <div className="row item">
//                 <div className="twelve columns">{education}</div>
//               </div>
//             </div>
//           </div>
//         </Slide>

//         <Slide left duration={1300}>
//           <div className="row work">
//             <div className="three columns header-col">
//               <h1>
//                 <span>Work</span>
//               </h1>
//             </div>

//             <div className="nine columns main-col">{work}</div>
//           </div>
//         </Slide>

//         <Slide left duration={1300}>
//           <div className="row skill">
//             <div className="three columns header-col">
//               <h1>
//                 <span>Skills</span>
//               </h1>
//             </div>

//             <div className="nine columns main-col">
//               <p>{skillmessage}</p>

//               <div className="bars">
//                 <ul className="skills">{skills}</ul>
//               </div>
//             </div>
//           </div>
//         </Slide>
//       </section>
//     );
//   }
// }

// export default Resume;

import React, { Component } from "react";

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      clubName: "",
      instagramHandle: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = {
      title: this.state.title,
      location: this.state.location,
      date: new Date(this.state.date).toISOString(),
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      description: this.state.description,
      clubName: this.state.clubName,
      instagramHandle: this.state.instagramHandle,
    };
  
    fetch('http://localhost:3000/api/storeForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      // Handle success here (e.g., display success message)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle errors here (e.g., display error message)
    });
  
    // Optionally reset the form here
    this.setState({
      title: "",
      location: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
      clubName: "",
      instagramHandle: "",
    });
  };
  

  renderFormInput = (label, name, type = "text", isOptional = false) => {
    return (
      <div className="row item">
        <div className="twelve columns">
          <label>{label}:</label>
          <input
            type={type}
            name={name}
            value={this.state[name]}
            onChange={this.handleChange}
            required={!isOptional} // Add the required attribute if not optional
          />
        </div>
      </div>
    );
  };
  

  renderTimeInputs = () => {
    return (
      <div className="row item">
        <div className="six columns">
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={this.state.startTime}
            onChange={this.handleChange}
          />
        </div>
        <div className="six columns">
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={this.state.endTime}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <section id="resume">
        <div className="row work">
          <div className="three columns header-col">
            <h1 className="event-form">
              <span>Event Form</span>
            </h1>
          </div>

          <div className="nine columns main-col event-form">
          <form onSubmit={this.handleSubmit}>
  {this.renderFormInput("Title", "title")}
  {this.renderFormInput("Location", "location")}
  {this.renderFormInput("Date", "date", "date")}
  {this.renderTimeInputs()} {/* Assume renderTimeInputs also handles the required attribute */}
  {this.renderFormInput("Description", "description")}
  {this.renderFormInput("Club Name", "clubName", "text", true)}
  {this.renderFormInput("Instagram Handle", "instagramHandle", "text", true)}
  {this.renderFormInput("Event Link", "eventLink", "text", true)} 
  <div className="row item">
    <div className="twelve columns">
      <button type="submit" className="submit">
        Submit
      </button>
    </div>
  </div>
</form>

          </div>
        </div>
      </section>
    );
  }
}

export default Resume;
