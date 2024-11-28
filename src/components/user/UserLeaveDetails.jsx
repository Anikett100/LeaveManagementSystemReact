import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from './Header';
import Footer from './Footer';
const baseURL = process.env.REACT_APP_API_BASE_URL;

function UserLeaveDetails() {
  const { id } = useParams(); 
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`${baseURL}/leave-details/${id}`);
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
      <Header />
      <div className="container mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-600">Leave Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Leave Type:</p>
            <p className="text-gray-600 mt-1">{leave.leavetype}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Leave Category:</p>
            <p className="text-gray-600 mt-1">{leave.leavecategory}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Sandwich Leave:</p>
            <p className="text-gray-600 mt-1">{leave.issandwich}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">From Date:</p>
            <p className="text-gray-600 mt-1">{leave.fromdate}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">To Date:</p>
            <p className="text-gray-600 mt-1">{leave.todate}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Number of Days:</p>
            <p className="text-gray-600 mt-1">{leave.noofdays}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Reason:</p>
            <p className="text-gray-600 mt-1">{leave.reason}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Status:</p>
            <p className="text-gray-600 mt-1">{leave.status}</p>
          </div>
          <div className="flex flex-col bg-gray-100 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Action Reason:</p>
            <p className="text-gray-600 mt-1">{leave.actionreason}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserLeaveDetails;
