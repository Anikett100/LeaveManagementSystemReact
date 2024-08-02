

// import React, { useState } from "react";
// import Sidebar from './sidebar'
// import Header from './Header';
// import Footer from '../user/Footer';

// import { Button } from '../ui/Button';
// import { CirclePlus } from 'lucide-react';
// import HolidayModal from './HolidayModal';
// import axios from "axios";
// import HolidayTable from "./HolidayTable";
// import FullScreenCalendar from "../Calender";

// function AdminHoliday() {
//   const [showForm, setShowForm] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [dateField, setDateField] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     day: '',
//     date: '',
//     type: ''
//   });

//   const handleAddHolidayClick = () => {
//     setShowForm(true);
//   };

//   const handleCloseModal = () => {
//     setShowForm(false);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const response = await axios.post('http://127.0.0.1:8000/api/add-holiday', formData,)
//     console.log(formData);
//     setShowForm(false);
//   };


//   const handleOpenCalendar = (field) => {
//     setDateField(field);
//   };
//   const handleSelectDate = (date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     setFormData((prevFormData) => {
//       const updatedFormData = {
//         ...prevFormData,
//         [dateField]: formattedDate,
//       };
//       return updatedFormData;
//     });
//     setShowCalendar(false);
//   };

//   return (
//     <>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex flex-col flex-1">
//           <Header />
//           <div className='container'>
//             <h1 className='text-3xl font-bold ml-3 mt-2'>Holidays and Events</h1>
//           </div>
//           <div className="container flex justify-end mt-4 space-x-2">
//             <Button className="bg-[#484C7F] flex items-center" onClick={handleAddHolidayClick}>
//               <CirclePlus className="w-5 h-5 mr-2" />
//               Add holidays
//             </Button>
//           </div>
//           <HolidayModal show={showForm} onClose={handleCloseModal}>
//             <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                   Holiday Name
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
//                   Date
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="date"
//                   name="date"
//                   type=""
//                   value={formData.date}
//                   onChange={handleChange}
//                   onClick={() => handleOpenCalendar("date")}
//                   required
//                 />
//                 {dateField === "date" && (
//                 <FullScreenCalendar
//                   onSelectDate={handleSelectDate}
//                   onClose={() => setDateField(null)}
//                 />
//               )}
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
//                   Day
//                 </label>
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="day"
//                   name="day"
//                   type="text"
//                   value={formData.day}
//                   onChange={handleChange}
                
//                   required
//                 />
               
//               </div>
              
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
//                   Type
//                 </label>
//                 <select
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="type"
//                   name="type"
//                   value={formData.type}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select Type</option>
//                   <option value="Holiday">Holiday</option>
//                   <option value="Event">Event</option>
//                 </select>
//               </div>
//               <div className="flex items-center justify-between">
//                 <Button className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//                   Submit
//                 </Button>
//               </div>
//             </form>
//           </HolidayModal>
//           <hr className='mt-2'></hr>
//           <div className="p-4 ml-6 ">
//             <HolidayTable />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default AdminHoliday;




import React, { useState } from "react";
import Sidebar from './sidebar';
import Header from './Header';
import Footer from '../user/Footer';
import { Button } from '../ui/Button';
import { CirclePlus } from 'lucide-react';
import HolidayModal from './HolidayModal';
import axios from "axios";
import HolidayTable from "./HolidayTable";
import FullScreenCalendar from "../Calender";

function AdminHoliday() {
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    date: '',
    type: ''
  });

  const handleAddHolidayClick = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/api/add-holiday', formData);
    console.log(formData);
    setShowForm(false);
  };

  const handleOpenCalendar = (field) => {
    setDateField(field);
    setShowCalendar(true);
  };

  const handleSelectDate = (date) => {;
    const formattedDate = date.toISOString().split("T")[0];
   const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [dateField]: formattedDate,
         day: dayOfWeek
      };
      return updatedFormData;
    });
    setShowCalendar(false);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <div className='container'>
            <h1 className='text-3xl font-bold ml-3 mt-2'>Holidays and Events</h1>
          </div>
          <div className="container flex justify-end mt-4 space-x-2">
            <Button className="bg-[#484C7F] flex items-center" onClick={handleAddHolidayClick}>
              <CirclePlus className="w-5 h-5 mr-2" />
              Add holidays
            </Button>
          </div>
          <HolidayModal show={showForm} onClose={handleCloseModal}>
            <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Holiday Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                  Date
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="date"
                  name="date"
                  type="text"
                  value={formData.date}
                  onChange={handleChange}
                  onClick={() => handleOpenCalendar("date")}
                  required
                />
                {dateField === "date" && (
                  <FullScreenCalendar
                    onSelectDate={handleSelectDate}
                    onClose={() => setDateField(null)}
                  />
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="day">
                  Day
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="day"
                  name="day"
                  type="text"
                  value={formData.day}
                  onChange={handleChange}
                   readOnly
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
                  Type
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <Button className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </HolidayModal>
          <hr className='mt-2'></hr>
          <div className="p-4 ml-6 ">
            <HolidayTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminHoliday;
