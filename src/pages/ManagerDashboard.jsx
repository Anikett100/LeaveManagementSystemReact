
import React from 'react'
import Header from '../components/manager/Header'
import Footer from '../components/user/Footer'
import Sidebar from '../components/manager/Sidebar'
import { ManagerLeaveTable } from '../components/manager/ManagerLeave'
import { Button } from "../components/ui/Button";
import { CirclePlus} from "lucide-react"; 
import Modal from "../components/user/Modal"; 
import { useState } from "react";

function ManagerDashboard() {
    const [showForm, setShowForm] = useState(false);

  const handleApplyLeaveClick = () => {
    setShowForm(true);
  };

  const handleCloseModal = () => {
    setShowForm(false);
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
        <form className="bg-white p-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">
              Leave Category
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option></option>
              <option>Casual Leave</option>
              <option>Sick leave</option>
              <option>Sandwitch Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveCategory">
              Leave Type
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option></option>
              <option>Full Day</option>
              <option>First Half</option>
              <option>Second half</option>
              <option>Short Leave</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromDate">
              From Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fromDate"
              type="date"
              placeholder="From Date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toDate">
              To Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="toDate"
              type="date"
              placeholder="To Date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noOfDays">
              No of Days
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="noOfDays"
              type="text"
              placeholder="no of days"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
              Reason
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              placeholder="Reason"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Submit
            </Button>
          </div>
        </form>
        </Modal>
      <ManagerLeaveTable/>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default ManagerDashboard