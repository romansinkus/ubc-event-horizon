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
import React, { useState, useContext } from 'react';
import './Day.css';
import {Tooltip, TooltipContext} from './Tooltip'; // Import the Tooltip component

const Day = ({ dayName, events }) => {
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const {setTooltip} = useContext(TooltipContext)

    // Function to handle mouse enter event
    const handleMouseEnter = (eventData) => {
        setTooltip(<Tooltip event={eventData} />)
    }

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setTooltip(null)
    }

    return (
        <div className="day">
            <h3>{dayName}</h3>
            <div className="entries">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="entry"
                        onMouseEnter={() => {
                            handleMouseEnter(event)
                        }}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div>{event["EventTitle"]}</div> {/* data1 is displayed on top */}
                        <div>{event.data2}</div> {/* data2 is displayed below data1 */}
                        {/* You can display more data points here if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Day;


