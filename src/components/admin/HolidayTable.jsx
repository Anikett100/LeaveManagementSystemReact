import { CircleX, CircleCheckBig, FilePenLine } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import HolidayModal from './HolidayModal';
import { Button } from '../ui/Button';
import FullScreenCalendar from "../Calender";






export  default function HolidayTable() {
  const [holidays, setHolidays] = useState([]);
  const [currentHoliday, setCurrentHoliday] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [formData, setFormData] = useState({
   day:"",
   date:"",
   name:"",
   type:""
  });
   

  const handleCloseModal = () => {
    setShowForm(false);
  };
  const fetchHolidays = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-holiday");
      setHolidays(response.data);
     
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
 
  
  const deleteHoliday = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this holiday?");
    if (!confirmed) {
      return;
    }
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete-holiday/${id}`);
      setHolidays(holidays.filter((holiday) => holiday.id !== id));
      fetchHolidays();
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };
  useEffect(() => {
    fetchHolidays();
  }, []);


  const handleEditClick = (holiday) => {
    setCurrentHoliday(holiday);
    setFormData({
      ...holiday,  
    });
    setShowForm(true);
  };


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/update-leave/${currentHoliday.id}`,
        formData
      );
      setHolidays(
        holidays.map((holiday) =>
          holiday.id === currentHoliday.id ? { ...formData } : holiday
        )
      );
      setShowForm(false);
    } catch (error) {
      console.error("Error updating holiday:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      return updatedFormData;
    });
  }; 
  const handleOpenCalendar = (field) => {
    setDateField(field);
  };


  const handleSelectDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [dateField]: formattedDate,
        day:dayOfWeek
      };
      return updatedFormData;
    });
    setShowCalendar(false);
  };

  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Sr no</TableHead>
            <TableHead>From Day</TableHead>
            <TableHead>From Date</TableHead>
            <TableHead>Holiday Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holidays.map((holiday) => (
            <TableRow key={holiday.SrNo}>
              <TableCell className="font-medium">{holiday.id}</TableCell>
              <TableCell>{holiday.day}</TableCell>
              <TableCell>{holiday.date}</TableCell>
              <TableCell>{holiday.name}</TableCell>
              <TableCell>{holiday.type}</TableCell>
              <TableCell>
              <div className="flex justify-around">
                  <button
                    className="rounded text-slate-600 transition"
                     onClick={() => deleteHoliday(holiday.id)}
                  >
                    <CircleX />
                  </button>
                  <button
                    className="rounded text-black transition"
                     onClick={() => handleEditClick(holiday)}
                  >
                    <FilePenLine />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showForm && (
         <HolidayModal show={showForm} onClose={handleCloseModal}>
         <form className="bg-white p-4 rounded shadow-md" onSubmit={handleUpdate}>
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
               type=""
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
      )}
    </div>
  );
}
