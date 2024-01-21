// import React from 'react';
// import Day from './Day';
// import './Calendar.css';

// export default function Calendar() {
//     const days = ['MON', 'TUES', 'WED', 'THURS', 'FRI', 'SAT', 'SUN'];

//     return (
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
//             <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
//                 <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
//                     <h1 className="calendar-header" data-aos="fade-up">UBC EVENT HORIZON</h1>
//                     <p className="calendar-subtitle" data-aos="fade-up" data-aos-delay="200">All the events in the UBC universe. All in one place.</p>
                    
//                     <div data-aos="fade-up" data-aos-delay="400">
//                         <h2 className="calendar-title">JANUARY 2024</h2>
//                         <div className="calendar">
//                             {days.map(day => <Day key={day} dayName={day} />)}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
