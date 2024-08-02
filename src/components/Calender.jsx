
// import React from 'react';
// import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// import { format, parse, startOfWeek, getDay } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { CircleX } from 'lucide-react';

// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const createDate = (year, month, day) => {
//   return new Date(year, month - 1, day);
// };


// const events = [
//   {
//     title: 'Meeting with Team',
//     start: createDate(2024, 7, 20),
//     end: createDate(2024, 7, 20),
//   },
//   {
//     title: 'Project Deadline',
//     start: createDate(2024, 7, 22),
//     end: createDate(2024, 7, 22),
//   },
// ];

// const holidays = [
//   {
//     title: 'Ashadhi Ekadashi',
//     start: createDate(2024, 7, 23),
//     end: createDate(2024, 7, 23),
//   },
// ];

// const combinedEvents = [...events, ...holidays];

// const FullScreenCalendar = ({ onClose, onSelectDate }) => {
//   const handleSelectSlot = ({ start }) => {
//     const selectedDate = new Date(start);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const isHoliday = holidays.some(event =>
//       selectedDate.getFullYear() === event.start.getFullYear() &&
//       selectedDate.getDate() === event.start.getDate() &&
//       selectedDate.getMonth() === event.start.getMonth()
//     );

//     if (selectedDate < today) {
//       alert("You cannot select a past date.");
//       return;
//     }

//     if (isHoliday) {
//       alert("You cannot select a holiday.");
//       return;
//     }

//     if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
//       alert("You cannot select a weekend.");
//       return;
//     }

//     const localDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1,);
//     onSelectDate(localDate);
//     onClose();
//   };

  

//   const dayPropGetter = (date) => {
//     const isHoliday = holidays.some(event =>
//       date.getFullYear() === event.start.getFullYear() &&
//       date.getDate() === event.start.getDate() &&
//       date.getMonth() === event.start.getMonth()
//     );

//     const isWeekend = date.getDay() === 0 || date.getDay() === 6;

//     return {
//       className: (isHoliday || isWeekend) ? ' pointer-events-none' : '',
//     };
//   };

//   const eventPropGetter = (event) => {
//     const isHoliday = holidays.some(holiday => holiday.title === event.title);
//     return {
//       className: isHoliday ? '!bg-red-500 !mt-2' : 'bg-blue-500 !mt-2',
//     };
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
//       <div className="relative bg-white p-4 rounded-lg w-11/12 h-5/6">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-black rounded-full p-2">
//           <CircleX />
//         </button>
//         <Calendar
//           localizer={localizer}
//           events={combinedEvents}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: '100%' }}
//           selectable
//           onSelectSlot={handleSelectSlot}
//           dayPropGetter={dayPropGetter}
//           eventPropGetter={eventPropGetter}
//           views={{
//             month: true,
//           }}
//           defaultView={Views.MONTH}
//           popup
//         />
//       </div>
//     </div>
//   );
// };

// export default FullScreenCalendar;










// import React from 'react';
// import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// import { format, parse, startOfWeek, getDay } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { CircleX } from 'lucide-react';

// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const createDate = (year, month, day) => {
//   return new Date(year, month - 1, day);
// };

// const events = [
//   {
//     title: 'Meeting with Team',
//     start: createDate(2024, 7, 20),
//     end: createDate(2024, 7, 20),
//   },
//   {
//     title: 'Project Deadline',
//     start: createDate(2024, 7, 22),
//     end: createDate(2024, 7, 22),
//   },
// ];

// const holidays = [
//   {
//     title: 'Ashadhi Ekadashi',
//     start: createDate(2024, 7, 23),
//     end: createDate(2024, 7, 23),
//   },
// ];

// const combinedEvents = [...events, ...holidays];

// const FullScreenCalendar = ({ onSelectDate }) => {
//   const handleSelectSlot = ({ start, end }) => {
//     const selectedStartDate = new Date(start);
//     const selectedEndDate = new Date(end);
//     onSelectDate(selectedStartDate, selectedEndDate);
//   };

//   const dayPropGetter = (date) => {
//     const isHoliday = holidays.some(event =>
//       date.getFullYear() === event.start.getFullYear() &&
//       date.getDate() === event.start.getDate() &&
//       date.getMonth() === event.start.getMonth()
//     );

//     const isWeekend = date.getDay() === 0 || date.getDay() === 6;

//     return {
//       className: (isHoliday || isWeekend) ? ' pointer-events-none' : '',
//     };
//   };

//   const eventPropGetter = (event) => {
//     const isHoliday = holidays.some(holiday => holiday.title === event.title);
//     return {
//       className: isHoliday ? '!bg-red-500 !mt-2' : 'bg-blue-500 !mt-2',
//     };
//   };

//   return (
//     <div className="p-4 rounded-lg w-full h-screen">
//       <Calendar
//         localizer={localizer}
//         events={combinedEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//         selectable
//         onSelectSlot={handleSelectSlot}
//         dayPropGetter={dayPropGetter}
//         eventPropGetter={eventPropGetter}
//         views={{
//           month: true,
//         }}
//         defaultView={Views.MONTH}
//         popup
//       />
//     </div>
//   );
// };

// export default FullScreenCalendar;







// import React from 'react';
// import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// import { format, parse, startOfWeek, getDay } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { CircleX } from 'lucide-react';

// const locales = {
//   'en-US': enUS,
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// const createDate = (year, month, day) => {
//   return new Date(year, month - 1, day);
// };

// const events = [
//   {
//     title: 'Meeting with Team',
//     start: createDate(2024, 7, 20),
//     end: createDate(2024, 7, 20),
//   },
//   {
//     title: 'Project Deadline',
//     start: createDate(2024, 7, 22),
//     end: createDate(2024, 7, 22),
//   },
// ];

// const holidays = [
//   {
//     title: 'Ashadhi Ekadashi',
//     start: createDate(2024, 7, 23),
//     end: createDate(2024, 7, 23),
//   },
// ];

// const combinedEvents = [...events, ...holidays];

// const FullScreenCalendar = ({ onSelectDate }) => {
//   const handleSelectSlot = ({ start, end }) => {
//     const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     const formattedStart = start.toLocaleDateString('en-CA', options);
//     const formattedEnd = end.toLocaleDateString('en-CA', options);
//     const dateRange = formattedStart === formattedEnd ? formattedStart : `${formattedStart} to ${formattedEnd}`;
//     onSelectDate(formattedStart, formattedEnd);
//   };

//   const dayPropGetter = (date) => {
//     const isHoliday = holidays.some(event =>
//       date.getFullYear() === event.start.getFullYear() &&
//       date.getDate() === event.start.getDate() &&
//       date.getMonth() === event.start.getMonth()
//     );

//     const isWeekend = date.getDay() === 0 || date.getDay() === 6;

//     return {
//       className: (isHoliday || isWeekend) ? ' pointer-events-none' : '',
//     };
//   };

//   const eventPropGetter = (event) => {
//     const isHoliday = holidays.some(holiday => holiday.title === event.title);
//     return {
//       className: isHoliday ? '!bg-red-500 !mt-2' : 'bg-blue-500 !mt-2',
//     };
//   };

//   return (
//     <div className="p-4 rounded-lg w-full h-[80vh]">
//       <Calendar
//         localizer={localizer}
//         events={combinedEvents}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//         selectable
//         onSelectSlot={handleSelectSlot}
//         dayPropGetter={dayPropGetter}
//         eventPropGetter={eventPropGetter}
//         views={{
//           month: true,
//         }}
//         defaultView={Views.MONTH}
//         popup
//       />
//     </div>
//   );
// };

// export default FullScreenCalendar;




import React from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CircleX } from 'lucide-react';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const createDate = (year, month, day) => {
  return new Date(year, month - 1, day);
};

const events = [
  {
    title: 'Meeting with Team',
    start: createDate(2024, 7, 20),
    end: createDate(2024, 7, 20),
  },
  {
    title: 'Project Deadline',
    start: createDate(2024, 7, 22),
    end: createDate(2024, 7, 22),
  },
];

const holidays = [
  {
    title: 'Ashadhi Ekadashi',
    start: createDate(2024, 7, 23),
    end: createDate(2024, 7, 23),
  },
];

const combinedEvents = [...events, ...holidays];

const FullScreenCalendar = ({ onSelectDate }) => {
  const handleSelectSlot = ({ start, end }) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedStart = start.toLocaleDateString('en-CA', options);

    // Adjust the end date to not include the next day
    const adjustedEnd = new Date(end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);
    const formattedEnd = adjustedEnd.toLocaleDateString('en-CA', options);

    const dateRange = formattedStart === formattedEnd ? formattedStart : `${formattedStart} to ${formattedEnd}`;
    onSelectDate(formattedStart, formattedEnd);
  };

  const dayPropGetter = (date) => {
    const isHoliday = holidays.some(event =>
      date.getFullYear() === event.start.getFullYear() &&
      date.getDate() === event.start.getDate() &&
      date.getMonth() === event.start.getMonth()
    );

    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return {
      className: (isHoliday || isWeekend) ? ' pointer-events-none' : '',
    };
  };

  const eventPropGetter = (event) => {
    const isHoliday = holidays.some(holiday => holiday.title === event.title);
    return {
      className: isHoliday ? '!bg-red-500 !mt-2' : 'bg-blue-500 !mt-2',
    };
  };

  return (
    <div className="p-4 rounded-lg w-full h-[80vh]">
      <Calendar
        localizer={localizer}
        events={combinedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={handleSelectSlot}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventPropGetter}
        views={{
          month: true,
        }}
        defaultView={Views.MONTH}
        popup
      />
    </div>
  );
};

export default FullScreenCalendar;
