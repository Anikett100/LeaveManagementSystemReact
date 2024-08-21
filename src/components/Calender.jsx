
// import React from 'react';
// import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
// import { format, parse, startOfWeek, getDay } from 'date-fns';
// import enUS from 'date-fns/locale/en-US';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { CircleX } from 'lucide-react';
// import axios from 'axios';

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

//     const adjustedEnd = new Date(end);
//     adjustedEnd.setDate(adjustedEnd.getDate() - 1);
//     const formattedEnd = adjustedEnd.toLocaleDateString('en-CA', options);

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







import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';

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

const FullScreenCalendar = ({ onSelectDate }) => {
  const [holidays, setHolidays] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchHolidaysAndEvents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/holidays-events');
        const data = response.data.holidays;

        const holidays = data.filter(item => item.type === 'Holiday').map(item => ({
          title: item.name,
          start: new Date(item.date),
          end: new Date(item.date),
          
        }));

        const events = data.filter(item => item.type === 'Event').map(item => ({
          title: item.name,
          start: new Date(item.date),
          end: new Date(item.date),
        }));
         
        setHolidays(holidays);
        setEvents(events);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchHolidaysAndEvents();
  }, []);

  const combinedEvents = [...events, ...holidays];

  const handleSelectSlot = ({ start, end }) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedStart = start.toLocaleDateString('en-CA', options);

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



