


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
    title: 'Ashadhi Ekadashi',
    start: createDate(2024, 7, 17),
    end: createDate(2024, 7, 17),
  },
];

const FullScreenCalendar = ({ onClose, onSelectDate }) => {
  const handleSelectSlot = ({ start }) => {
    const selectedDate = new Date(start);
    const localDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 1);
    onSelectDate(localDate);
    onClose();
  };

  const dayPropGetter = (date) => {
    const isHoliday = events.some(event =>
      date.getFullYear() === event.start.getFullYear() &&
      date.getDate() === event.start.getDate() &&
      date.getMonth() === event.start.getMonth()
    );

    return {
      className: isHoliday ? '!bg-red-500  !pointer-events-none' : '',
    };
  };

  const eventPropGetter = (event) => {
    return {
      className: '!bg-red-500',
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="relative bg-white p-4 rounded-lg w-11/12 h-5/6">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black rounded-full p-2">
          <CircleX />
        </button>
        <Calendar
          localizer={localizer}
          events={events}
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
    </div>
  );
};

export default FullScreenCalendar;


