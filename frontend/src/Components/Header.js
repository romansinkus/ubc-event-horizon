import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

class Header extends Component {
  render() {
    if (!this.props.data) return null;

    const project = this.props.data.project;
    const github = this.props.data.github;
    const name = this.props.data.name;
    const description = this.props.data.description;

    // Particle configuration
    const particleConfig = {
      num: [9, 18],
      rps: 0.1,
      radius: [3, 30],
      life: [1.5, 3],
      v: [.5, .75],
      tha: [-40, 40],
      alpha: [1, 0], // Increased opacity
      scale: [.1, .4],
      position: "all",
      color: ["#4d4db7", "#0e21a0", "#910a67"], // White color with full opacity
      cross: "dead",
      random: 15
    };

    return (
      <header id="home">
        <ParticlesBg type="custom" config={particleConfig} bg={true} />

        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#about">
                Calendar
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#resume">
                Add Event
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#portfolio">
                Featured
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">{name}</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>{description}.</h3>
            </Fade>
            <hr />
            <Fade bottom duration={2000}>
              <ul className="social">
                {/* <a href={project} className="button btn project-btn">
                  <i className="fa fa-book"></i>Project
                </a> */}
                {/* <a href={github} className="button btn github-btn">
                  <i className="fa fa-github"></i>Github
                </a> */}
              </ul>
            </Fade>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;


// import React, { Component } from "react";
// import ParticlesBg from "particles-bg";
// import Fade from "react-reveal";

// class Header extends Component {
//   render() {
//     if (!this.props.data) return null;

//     const project = this.props.data.project;
//     const github = this.props.data.github;
//     const name = this.props.data.name;
//     const description = this.props.data.description;

//     return (
//       <header id="home">
//         <ParticlesBg 
//           type="cobweb" 
//           config={{
//             num: [4, 7],
//             rps: 0.1,
//             radius: [5, 40],
//             life: [1.5, 3],
//             v: [2, 3],
//             tha: [-40, 40],
//             alpha: [0.6, 0],
//             scale: [.1, 0.4],
//             position: "all",
//             color: ["rgba(189, 128, 242, 1.0)"],
//             cross: "dead",
//             random: 15
//           }}
//           bg={true} 
//         />

//         <nav id="nav-wrap">
//           <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
//             Show navigation
//           </a>
//           <a className="mobile-btn" href="#home" title="Hide navigation">
//             Hide navigation
//           </a>

//           <ul id="nav" className="nav">
//             <li className="current">
//               <a className="smoothscroll" href="#home">
//                 Home
//               </a>
//             </li>

//             <li>
//               <a className="smoothscroll" href="#about">
//                 Calendar
//               </a>
//             </li>

//             <li>
//               <a className="smoothscroll" href="#resume">
//                 Resume
//               </a>
//             </li>

//             <li>
//               <a className="smoothscroll" href="#portfolio">
//                 Works
//               </a>
//             </li>

//             <li>
//               <a className="smoothscroll" href="#contact">
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </nav>

//         <div className="row banner">
//           <div className="banner-text">
//             <Fade bottom>
//               <h1 className="responsive-headline">{name}</h1>
//             </Fade>
//             <Fade bottom duration={1200}>
//               <h3>{description}.</h3>
//             </Fade>
//             <hr />
//             <Fade bottom duration={2000}>
//               <ul className="social">
//                 <a href={project} className="button btn project-btn">
//                   <i className="fa fa-book"></i>Project
//                 </a>
//                 <a href={github} className="button btn github-btn">
//                   <i className="fa fa-github"></i>Github
//                 </a>
//               </ul>
//             </Fade>
//           </div>
//         </div>

//         <p className="scrolldown">
//           <a className="smoothscroll" href="#about">
//             <i className="icon-down-circle"></i>
//           </a>
//         </p>
//       </header>
//     );
//   }
// }

// export default Header;
