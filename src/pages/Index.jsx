
import React, { useState } from "react";
import { TableDemo } from "../components/user/Table";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import { Button } from "../components/ui/Button";
import { CirclePlus } from "lucide-react";
import Modal from "../components/user/Modal";
import FullScreenCalendar from "../components/Calender";
import { Link } from "react-router-dom";
import axios from 'axios'; 

export default function Index() {
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [formData, setFormData] = useState({
    leaveCategory: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    noOfDays: '',
    reason: '',
  });
  const handleApplyLeaveClick = () => {
    setShowForm(true);
  };
  
  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleOpenCalendar = (field) => {
    setDateField(field);
    setShowCalendar(true);
  };

  const handleSelectDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [dateField]: formattedDate,
      };
      if (updatedFormData.fromDate && updatedFormData.toDate) {
        if (dateField === "toDate" && new Date(updatedFormData.toDate) < new Date(updatedFormData.fromDate)) {
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.toDate = "";
          updatedFormData.noOfDays = "";
        } else if (dateField === "fromDate" && new Date(updatedFormData.toDate) < new Date(updatedFormData.fromDate)) {
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.toDate = "";
          updatedFormData.noOfDays = "";
        } else {
          const noOfDays = calculateNoOfDays(updatedFormData.fromDate, updatedFormData.toDate);
          updatedFormData.noOfDays = noOfDays;
        }
      }
      return updatedFormData;
    });
    setShowCalendar(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      if ((name === "fromDate" || name === "toDate") && updatedFormData.fromDate && updatedFormData.toDate) {
        if (new Date(updatedFormData.toDate) < new Date(updatedFormData.fromDate)) {
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.toDate = "";
          updatedFormData.noOfDays = "";
        } else {
          const noOfDays = calculateNoOfDays(updatedFormData.fromDate, updatedFormData.toDate);
          updatedFormData.noOfDays = noOfDays;
        }
      }
      return updatedFormData;
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add-leave', formData);
      setShowForm(false)
    } catch (error) {
      setError('error');
      console.error(' error:', error);  
    } 
  };

  const calculateNoOfDays = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return diffDays;
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex justify-end mt-4 space-x-2">
          <Button className="bg-[#484C7F] flex items-center" onClick={handleApplyLeaveClick}>
            <CirclePlus className="w-5 h-5 mr-2" />
            Apply Leave
          </Button>
          
          <Link to='/user-holidays'>
          <Button className="bg-[#FF6347] flex items-center" >
            Holidays
          </Button>
          </Link>
        </div>
      </div>
      <Modal show={showForm} onClose={handleCloseModal}>
        <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveCategory">
              Leave Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="leaveCategory"
              name="leaveCategory"
              value={formData.leaveCategory}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Sandwich Leave">Sandwich Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">
              Leave Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="leaveCategory"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Full Day">Full Day</option>
              <option value="First Half">First Half</option>
              <option value="Second Half">Second Half</option>
              <option value="Short Leave">Short Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromDate">
              From Date
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fromDate"
                name="fromDate"
                type="text"
                value={formData.fromDate}
                onClick={() => handleOpenCalendar("fromDate")}
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toDate">
              To Date
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="toDate"
                name="toDate"
                type="text"
                value={formData.toDate}
                onClick={() => handleOpenCalendar("toDate")}
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noOfDays">
              No of Days
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="noOfDays"
              name="noOfDays"
              type="text"
              value={formData.noOfDays}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
              Reason
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <Button className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Modal>
     
      {showCalendar && (
        <FullScreenCalendar onClose={() => setShowCalendar(false)} onSelectDate={handleSelectDate} />
      )}
      <div className="container">
      <TableDemo />
      </div>
      <Footer />
    </>
  );
}




