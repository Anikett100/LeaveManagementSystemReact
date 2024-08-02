

import React, { useState } from 'react';
import Header from './Header';
import FullScreenCalendar from '../Calender';
import Footer from './Footer';
import { CircleX } from 'lucide-react';
import { MultiSelect } from "react-multi-select-component";
import axios from 'axios';
import moment from 'moment';

const ApplyLeave = () => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const [disableOptions, setDisableOptions] = useState(false);

  const [formData, setFormData] = useState({
    leavetype: '',
    leavecategory: '',
    cc: [],
    reason: '',
    daterange: '',
    user_id: '',
    issandwich: '',
    noofdays: '',
    start_date: '',
    end_date: '',
  });

  const handleSelectDate = (start, end) => {
    const today = moment().startOf('day');
    const startDate = moment(start);
    const endDate = moment(end);
  
   
    if (startDate.day() === 6 || startDate.day() === 0 || endDate.day() === 6 || endDate.day() === 0) {
      alert("you cannot select weekend days")
      setError('Cannot select individual Saturdays or Sundays.');
      return;
    }

  
  
   
    if (startDate.isBefore(today) || endDate.isBefore(today)) {
      alert("you cannot select previous date  ")
      setError('Cannot select previous dates.');
      return;
    }
  
    const daterange = start === end ? start : `${start} to ${end}`;
    const noofdays = endDate.diff(startDate, 'days') + 1;
  
    let isSandwich = false;
    for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, 'days')) {
      if (date.day() === 6 || date.day() === 0) {
        isSandwich = true;
        break;
      }
    }

    const newLeaveType = noofdays > 1 ? 'Full Day' : formData.leavetype;
    const disableOptions = noofdays > 1;
  
    setFormData({
      ...formData,
      daterange,
      noofdays,
      issandwich: isSandwich ? 'Yes' : 'No',
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD'),
      leavetype: newLeaveType,
    });
    setShowForm(true);
  };
  

  const handleCloseModal = () => {
    setShowForm(false);
    setFormData({
      leavetype: '',
      leavecategory: '',
      cc: [],
      reason: '',
      daterange: '',
      noofdays: '',
      issandwich: '',
      user_id: '',
      start_date: '',
      end_date: '',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setFormData((prevFormData) => ({
      ...prevFormData,
      cc: selectedOptions.map(option => option.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    const authToken = localStorage.getItem('token');
    const leaveData = {
      ...formData,
      user_id: userId,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add-leave', leaveData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert('Leave request sent successfully');
      handleCloseModal();
    } catch (error) {
      setError('Error submitting leave request');
      console.error('Error:', error);
    }
  };

  const options = [
    { label: "sankalp@ycstech.in", value: "sankalp@ycstech.in" },
    { label: "kartik@ycstech.in", value: "kartik@ycstech.in" },
    { label: "design@ycstech.in", value: "design@ycstech.in" },
  ];

  return (
    <>
      <Header />
      <FullScreenCalendar onSelectDate={handleSelectDate} />
      <Footer />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-black rounded-full p-2"
            >
              <CircleX />
            </button>
            <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <select
                  name="leavetype"
                  value={formData.leavecategory}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>Select Leave category</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                </select>
              </div>
              <div className="mb-4">
                <select
                  name="leavecategory"
                  value={formData.leavetype}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>Select Leave Type</option>
                  <option value="Full Day">Full Day</option>
                  <option value="First Half" disabled={disableOptions}>First Half</option>
                  <option value="Second Half" disabled={disableOptions}>Second Half</option>
                  <option value="Short Leave" disabled={disableOptions}>Short Leave</option>
                </select>
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  name="daterange"
                  value={formData.daterange}
                  placeholder="Date Range"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={handleSelectChange}
                  labelledBy="Select"
                />
              </div>

              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="noofdays"
                  name="noofdays"
                  type="text"
                  placeholder='Number of days'
                  value={formData.noofdays}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="issandwich"
                  name="issandwich"
                  type="text"
                  placeholder='Sandwich Leave?'
                  value={formData.issandwich}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please add your reason"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyLeave;
