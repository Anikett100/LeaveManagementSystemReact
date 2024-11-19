import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Swal from 'sweetalert2';

const baseURL = process.env.REACT_APP_API_BASE_URL;

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
  const [approvedLeaves, setApprovedLeaves] = useState([]);

  useEffect(() => {
    const fetchHolidaysAndEvents = async () => {
      try {
        const response = await axios.get(`${baseURL}/holidays-events`);
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

    const fetchApprovedLeaves = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const response = await axios.get(`${baseURL}/Appoved-leaves`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` 
          }
        });

        if (response.data && response.data.leaves) {
          const approvedLeaves = response.data.leaves
            .filter(leave => leave.status === 'Approved')
            .map(leave => ({
              title: leave.leavetype + " " +leave.leavecategory, 
              start: new Date(leave.fromdate),
              end: new Date(leave.todate),
            }));
    
          setApprovedLeaves(approvedLeaves);
        } else {
          console.error('Leaves data not found in response');
        }
      } catch (error) {
        console.error("Error fetching approved leaves:", error);
      }
    };

    fetchHolidaysAndEvents();
    fetchApprovedLeaves();
  }, []);

  const combinedEvents = [...events, ...holidays, ...approvedLeaves];

  const isHoliday = (date) => {
    return holidays.some(holiday =>
      date.getFullYear() === holiday.start.getFullYear() &&
      date.getDate() === holiday.start.getDate() &&
      date.getMonth() === holiday.start.getMonth()
    );
  };

  const isWeekend = (date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const handleSelectSlot = ({ start, end }) => {
    const adjustedEnd = new Date(end);
    adjustedEnd.setDate(adjustedEnd.getDate() - 1);

    if (isWeekend(start) || isWeekend(adjustedEnd)) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: 'You cannot start or end a selection on a weekend (Saturday or Sunday).',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    let isHolidaySelected = false;
    for (let d = new Date(start); d <= adjustedEnd; d.setDate(d.getDate() + 1)) {
      if (isHoliday(d)) {
        isHolidaySelected = true;
        break;
      }
    }

    if (isHolidaySelected) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: 'You cannot select a date range that includes a holiday.',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedStart = start.toLocaleDateString('en-CA', options);
    const formattedEnd = adjustedEnd.toLocaleDateString('en-CA', options);

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
      className: (isHoliday || isWeekend) ? 'pointer-events-none' : '',
    };
  };

  const eventPropGetter = (event) => {
    let backgroundColor = 'bg-blue-500'; 
    const isHoliday = holidays.some(holiday => holiday.title === event.title);
    
    if (isHoliday) {
        backgroundColor = '!bg-red-500 !mt-2'; 
    } else if (approvedLeaves.some(leave => leave.title === event.title)) { 
        backgroundColor = '!bg-[#F27022y] !mt-2'; 
    }

    return {
        className: `${backgroundColor}`,
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
