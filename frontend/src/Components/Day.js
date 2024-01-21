// import React from 'react';
// import './Day.css';

// const Day = ({ dayName }) => {
//     // Mock data for entries. Replace with actual data.
//     const entries = new Array(10).fill(null).map((_, index) => `Entry ${index + 1}`);

//     return (
//         <div className="day">
//             <h3>{dayName}</h3>
//             <div className="entries">
//                 {entries.map((entry, index) => <div key={index} className="entry">{entry}</div>)}
//             </div>
//         </div>
//     );
// }

// export default Day;

// ------

// import React from 'react';
// import './Day.css';

// const Day = ({ dayName, events }) => {
//     return (
//         <div className="day">
//             <h3>{dayName}</h3>
//             <div className="entries">
//                 {events.map((event, index) => (
//                     <div key={index} className="entry">
//                         <div>{event.data1}</div> {/* data1 is displayed on top */}
//                         <div>{event.data2}</div> {/* data2 is displayed below data1 */}
//                         {/* You can display more data points here if needed */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Day;

// ------

// Day.js
import React, { useState, useEffect, useContext } from "react";
import "./Day.css";
import { Tooltip, TooltipContext } from "./Tooltip"; // Import the Tooltip component

const Day = ({ dayName, events }) => {
  console.log({ events });

  const [hovEvent, setHoveredEvent] = useState(null);
  const { setTooltip } = useContext(TooltipContext);

  // Function to handle mouse enter event
  const handleMouseEnter = (eventData) => {
    setTooltip(<Tooltip event={eventData} />);
  };

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    setTooltip(null);
  };

  useEffect(() => {
    console.log(events, " is the events");
  }, [events]);

  return (
    <div className="day">
      <h3>{dayName}</h3>
      <div className="entries">
        {events.map((event, index) => (
          <div
            key={index}
            className="entry"
            onMouseEnter={() => {
              handleMouseEnter(event);
            }}
            onMouseLeave={handleMouseLeave}
          >
            {event.eventLink ? (
              <a href={event.eventLink}>
                <div>{event["Event Title"]}</div>
                {/* <div>{event.data2}</div> */}
                {/* You can display more data points here if needed */}
              </a>
            ) : (
              <>
                <div>{event["Event Title"]}</div>
                {/* <div>{event.data2}</div> */}
                {/* You can display more data points here if needed */}
              </>
            )}
            {/* <div>{event["EventTitle"]}</div> data1 is displayed on top */}
            {/* <div>{event.data2}</div> data2 is displayed below data1 */}
            {/* You can display more data points here if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
