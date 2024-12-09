import React, { useState } from "react";
import Sidebar from './sidebar';
import Header from './Header';
import Footer from '../user/Footer';
import { Button } from '../ui/Button';
import { CirclePlus } from 'lucide-react';
import HolidayModal from './HolidayModal';
import axios from "axios";
import HolidayTable from "./HolidayTable";
import HolidayCalendarModal from './HolidayCalendarModal';
import moment from "moment";
const baseURL = process.env.REACT_APP_API_BASE_URL;

function AdminHoliday() {
  const [showForm, setShowForm] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
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
    const response = await axios.post(`${baseURL}/add-holiday`, formData);
    console.log(response.data);
    setShowForm(false);
  };

  const handleOpenCalendarModal = () => {
    setShowCalendarModal(true);
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

  return (
    <>
      <div className="flex h-screen">
        <div className="fixed top-0 left-0 h-full w-64">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ml-64 overflow-auto">
          <Header />
          <div className="container">
          <div className="flex items-center justify-between mt-4 px-4">
            <h1 className="text-3xl font-bold text-[#324983]">Holidays and Events</h1>
            <Button className="bg-[#324983] flex items-center" onClick={handleAddHolidayClick}>
              <CirclePlus className="w-5 h-5 mr-2" />
              Add holidays
            </Button>
          </div>
          </div>
          <HolidayModal show={showForm} onClose={handleCloseModal}>
            <form className="bg-white p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
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

          <HolidayCalendarModal 
            isOpen={showCalendarModal}
            onClose={() => setShowCalendarModal(false)}
            onSelectDate={handleSelectDate}
          />
          <hr className='mt-2' />
          <div className="p-4 ml-6 overflow-auto">
            <HolidayTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AdminHoliday;
