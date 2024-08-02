
import React from 'react'
import Header from '../components/manager/Header'
import Footer from '../components/user/Footer'
import Sidebar from '../components/manager/Sidebar'

import { Button } from "../components/ui/Button";
import { CirclePlus} from "lucide-react"; 
import Modal from "../components/user/Modal"; 
import { useState } from "react";
import axios from 'axios'
import FullScreenCalendar from "../components/Calender";
import { TableDemo } from '../components/manager/ManagerLeave';

function ManagerDashboard() {
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateField, setDateField] = useState(null);
  const [formData, setFormData] = useState({
    leavecategory: '',
    leavetype: '',
    fromdate: '',
    todate: '',
    noofdays: '',
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
      if (updatedFormData.fromdate && updatedFormData.todate) {
        if (dateField === "todate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else if (dateField === "fromdate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else {
          const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
          updatedFormData.noofdays = noofdays;
          if (containsWeekend(updatedFormData.fromdate, updatedFormData.todate)) {
            updatedFormData.leavecategory = "Sandwich Leave";
          }
        }
      }
      return updatedFormData;
    });
    setShowCalendar(false);
  };

  // for sandwitch leave 
  const containsWeekend = (fromdate, todate) => {
    const from = new Date(fromdate);
    const to = new Date(todate);
    for (let d = from; d <= to; d.setDate(d.getDate() + 1)) {
      // 0 sunday and 6 is saturday
      if (d.getDay() === 6 || d.getDay() === 0) { 
        return true;
      }
    }
    return false;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        [name]: value,
      };
      if ((name === "fromdate" || name === "todate") && updatedFormData.fromdate && updatedFormData.todate) {
        if (new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else {
          const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
          updatedFormData.noofdays = noofdays;
          if (containsWeekend(updatedFormData.fromdate, updatedFormData.todate)) {
            updatedFormData.leavecategory = "Sandwich Leave";
          }
        }
      }
      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/add-managerleave',formData);
      setShowForm(false);
      alert("Leave request sent successfully");
    } catch (error) {
      setError('Error submitting leave request');
      console.error('Error:', error);
    }
  };

  const calculateNoOfDays = (fromdate, todate) => {
    const from = new Date(fromdate);
    const to = new Date(todate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };
  return (
    <>
    <div className="flex">
    <Sidebar/>
    <div className="flex flex-col flex-1">
      <Header />
      <div className="p-4">
      <div className="container">
        <div className="flex justify-end mt-4 space-x-2"> 
          <Button className="bg-[#484C7F] flex items-center" onClick={handleApplyLeaveClick}>
            <CirclePlus className="w-5 h-5 mr-2" />
            Apply Leave
          </Button>
        </div>
      </div>
      <Modal show={showForm} onClose={handleCloseModal}>
        <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leavecategory">
              Leave Category
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="leavecategory"
              name="leavecategory"
              value={formData.leavecategory}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option className="hidden" value="Sandwich Leave">Sandwich Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leavetype">
              Leave Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="leavetype"
              name="leavetype"
              value={formData.leavetype}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromdate">
              From Date
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fromdate"
                name="fromdate"
                type="text"
                value={formData.fromdate}
                onClick={() => handleOpenCalendar("fromdate")}
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="todate">
              To Date
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="todate"
                name="todate"
                type="text"
                value={formData.todate}
                onClick={() => handleOpenCalendar("todate")}
                readOnly
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noofdays">
              No of Days
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="noofdays"
              name="noofdays"
              type="text"
              value={formData.noofdays}
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
        <TableDemo/>
      </div>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default ManagerDashboard