import React from "react";
import FullScreenCalendar from "../Calender"; 

function HolidayCalendarModal({ isOpen, onClose, onSelectDate }) {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white p-6 rounded shadow-lg w-1/2 max-w-4xl">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-black text-2xl">
            &times;
          </button>
        </div>
        <FullScreenCalendar onSelectDate={onSelectDate} onClose={onClose} />
      </div>
    </div>
  );
}

export default HolidayCalendarModal;
