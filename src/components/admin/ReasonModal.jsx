
// import React from "react";

// function AdminModal({ show, onClose, children }) {
//   if (!show) return null;

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//       onClick={handleBackdropClick}
//     >
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/3">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h3 className="text-lg font-semibold text-gray-900">Reason for Leave Action</h3>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             &times;
//           </button>
//         </div>
//         <div className="p-4">
//           {children}
//         </div>
//         <div className="flex justify-end p-4 border-t">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-700"
//           >
//             Cancel
//           </button>
//           <button
//             className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-700"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default AdminModal;

import React from "react";

function AdminModal({ show, onClose, children }) {
  if (!show) return null;

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
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Reason for Leave Action</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
export default AdminModal;

