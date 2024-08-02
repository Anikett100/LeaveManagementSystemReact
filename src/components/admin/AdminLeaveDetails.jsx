import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 


import Header from './Header';
import Sidebar from './sidebar';
import Footer from '../user/Footer';

function AdminLeaveDetails() {
  const { id } = useParams(); 
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/leave-details/${id}`);
        setLeave(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]); 

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error loading leave details</div>;
  }

  if (!leave) {
    return <div className="flex justify-center items-center h-screen">No leave details found</div>;
  }

  return (
    <>
     
       <div className="flex">
    <Sidebar/>
    <div className="flex flex-col flex-1">
      <Header/>
      <div className='container'>
      <h1 className='text-3xl font-bold ml-3 mt-2 mb-1'>Leave Details</h1>
      </div>
      <hr></hr>
      <div className="p-4">
      <div className="container">
      </div>
      <div className="container">
      <div className="container mx-auto my-8 p-6 m">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <p className="font-semibold">Leave Type:</p>
            <p className="text-gray-700 mt-1">{leave.leavetype}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Leave Category:</p>
            <p className="text-gray-700 mt-1">{leave.leavecategory}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Sandwich Leave:</p>
            <p className="text-gray-700 mt-1">{leave.issandwich ? 'Yes' : 'No'}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">From Date:</p>
            <p className="text-gray-700 mt-1">{leave.fromdate}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">To Date:</p>
            <p className="text-gray-700 mt-1">{leave.todate}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Number of Days:</p>
            <p className="text-gray-700 mt-1">{leave.noofdays}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Reason:</p>
            <p className="text-gray-700 mt-1">{leave.reason}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Status:</p>
            <p className="text-gray-700 mt-1">{leave.status}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold">Action Reason:</p>
            <p className="text-gray-700 mt-1">{leave.actionreason}</p>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  </div>
      <Footer/>
    </>
  );
}

export default AdminLeaveDetails;
