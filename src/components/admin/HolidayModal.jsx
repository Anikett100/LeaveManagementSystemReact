import React from "react";

function HolidayModal({ show, onClose, children }) {
  if (!show) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50"
      onClick={handleBackdropClick}>
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-black">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
export default HolidayModal;