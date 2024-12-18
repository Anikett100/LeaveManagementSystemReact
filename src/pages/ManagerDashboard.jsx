import React, { useState } from 'react';
import Header from '../components/manager/Header';
import Footer from '../components/user/Footer';
import Sidebar from '../components/manager/Sidebar';
import { Button } from "../components/ui/Button";
import { CirclePlus } from "lucide-react"; 
import axios from 'axios';
import FullScreenCalendar from "../components/Calender";
import { TableDemo } from '../components/manager/ManagerLeaveTable';
import { Link } from 'react-router-dom';

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

  const handleApplyLeaveClick = () => setShowForm(true);
  const handleCloseModal = () => setShowForm(false);

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

  const containsWeekend = (fromdate, todate) => {
    const from = new Date(fromdate);
    const to = new Date(todate);
    for (let d = from; d <= to; d.setDate(d.getDate() + 1)) {
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
      await axios.post('http://127.0.0.1:8000/api/add-managerleave', formData);
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
        <div className="fixed top-0 left-0 h-full w-64">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ml-64">
          <Header />
          <div className="p-4">
            <div className="container">
              <div className="flex justify-between mt-4 space-x-2">
                <h1 className="text-3xl text-[#324983] font-bold ml-3 mt-2 mb-1">Leaves</h1>
                <Link to="/manager-leave">
                  <Button className="bg-[#324983] flex items-center">
                    <CirclePlus className="w-5 h-5 mr-2" />
                    Apply Leave
                  </Button>
                </Link>
              </div>
              <hr />
            </div>
            <div className="">
              <TableDemo />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManagerDashboard;

