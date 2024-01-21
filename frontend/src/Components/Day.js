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

import React from 'react';
import './Day.css';

const Day = ({ dayName, events }) => {
    return (
        <div className="day">
            <h3>{dayName}</h3>
            <div className="entries">
                {events.map((event, index) => (
                    <div key={index} className="entry">
                        <div>{event.data1}</div> {/* data1 is displayed on top */}
                        <div>{event.data2}</div> {/* data2 is displayed below data1 */}
                        {/* You can display more data points here if needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Day;


