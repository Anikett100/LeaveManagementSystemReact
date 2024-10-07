
import React, { useState, useEffect } from "react";
import axios from "axios";
import HolidayModal from './HolidayModal';
import { Button } from '../ui/Button';
import FullScreenCalendar from "../Calender";
import HolidayCalendarModal from './HolidayCalendarModal';
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "../ui/Table";
import { Trash2, FilePenLine } from "lucide-react";
import moment from "moment";
const baseURL = process.env.REACT_APP_API_BASE_URL;


export default function HolidayTable() {
  const ITEMS_PER_PAGE = 4; 
  const [currentPage, setCurrentPage] = useState(1);
  const [holidays, setHolidays] = useState([]);
  const [currentHoliday, setCurrentHoliday] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [formData, setFormData] = useState({
    day: "",
    date: "",
    name: "",
    type: "",
  });

  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-holiday`);
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
      await axios.delete(`${baseURL}/delete-holiday/${id}`);
      setHolidays(holidays.filter((holiday) => holiday.id !== id));
      fetchHolidays();
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

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
        `${baseURL}/update-holiday/${currentHoliday.id}`, 
        formData
      );
      setHolidays(
        holidays.map((holiday) =>
          holiday.id === currentHoliday.id ? { ...formData, id: currentHoliday.id } : holiday
        )
      );
      setShowForm(false);
    } catch (error) {
      console.error("Error updating holiday:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOpenCalendar = (field) => {
    setDateField(field);
    setShowCalendar(true);
  };

  const handleSelectDate = (date) => {
    const selectedDate = new Date(date);
     const formattedDate = moment(selectedDate).format("MMMM D, YYYY");

 
    const selectedDay = moment(selectedDate).format("dddd"); 
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: formattedDate,
      day: selectedDay,
    }));
  
    setShowCalendarModal(false); 
  };

  useEffect(() => {
    fetchHolidays();
  }, []);
  
  const handleCloseModal = () => {
    setShowForm(false);
  };
  const handleOpenCalendarModal = () => {
    setShowCalendarModal(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const totalPages = Math.ceil(holidays.length / ITEMS_PER_PAGE);

  const currentItems = holidays.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Sr no</TableHead>
            <TableHead className="text-black">Day</TableHead>
            <TableHead className="text-black">Date</TableHead>
            <TableHead className="text-black">Holiday Name</TableHead>
            <TableHead className="text-black">Type</TableHead>
            <TableHead className="text-black text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems .map((holiday, index) => (
            <TableRow
              key={holiday.id}
              className={`${holiday.type === "Holiday" ? "text-red-600" : "text-green-800"}`}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{holiday.day}</TableCell>
              <TableCell>{holiday.date}</TableCell>
              <TableCell>{holiday.name}</TableCell>
              <TableCell>{holiday.type}</TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <button
                    className="rounded text-red-600 transition"
                    onClick={() => deleteHoliday(holiday.id)}
                  >
                    <Trash2 />
                  </button>
                  <button
                    className="rounded text-blue-600 transition"
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

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Next
        </button>
      </div>
      
      {showForm && (
        <HolidayModal show={showForm} onClose={handleCloseModal}>
        <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleUpdate}>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="name">
              Holiday Name
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="name"
              name="name"
              type="text"
              placeholder="Enter holiday name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="date">
              Date
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="date"
              name="date"
              type="text"
              placeholder="Select date"
              value={formData.date}
              onClick={handleOpenCalendarModal}
              readOnly
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="day">
              Day
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              id="day"
              name="day"
              type="text"
              placeholder="Day of the week"
              value={formData.day}
              readOnly
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-sm font-semibold mb-2" htmlFor="type">
              Type
            </label>
            <select
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </HolidayModal>
      )}
       <HolidayCalendarModal 
            isOpen={showCalendarModal}
            onClose={() => setShowCalendarModal(false)}
            onSelectDate={handleSelectDate}
          />    
    </div>
    
  );
}
