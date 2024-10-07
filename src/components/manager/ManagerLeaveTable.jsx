import React, { useState, useEffect } from "react";
import { CircleX, FilePenLine } from "lucide-react";
import axios from "axios";
import Modal from "../user/Modal";
import { Button } from "../ui/Button";
import FullScreenCalendar from "../Calender";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const ITEMS_PER_PAGE = 4; 

export function TableDemo() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    leavecategory: "",
    leavetype: "",
    fromdate: "",
    todate: "",
    noofdays: "",
    reason: "",
  });
  const [dateField, setDateField] = useState(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-managerleaves`);
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteLeave = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this leave?");
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${baseURL}/delete-managerleave/${id}`);
      setLeaves(leaves.filter((leave) => leave.id !== id));
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // alert("You cannot delete this leave as it has been approved by the admin.");
        Swal.fire({
          position: "top-center",
          icon: "warning",
          title: "You cannot delete this leave as it has been approved by the admin.",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error("Error deleting leave:", error);
        alert("An error occurred while trying to delete the leave.");
      }
    }
  };

  const handleEditClick = (leave) => {
    setCurrentLeave(leave);
    setFormData({
      ...leave, 
      fromdate: leave.fromdate, 
      todate: leave.todate, 
    });
    setShowForm(true);
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
          // alert("The 'To Date' cannot be earlier than the 'From Date'.");
          Swal.fire({
            position: "top-center",
            icon: "warning",
            title: "The 'To Date' cannot be earlier than the 'From Date'.",
            showConfirmButton: false,
            timer: 1500
          });
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else {
          const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
          updatedFormData.noofdays = noofdays;
          
          if (isWeekendPeriod(updatedFormData.fromdate, updatedFormData.todate)) {
            updatedFormData.leavecategory = "Sandwich Leave";
          }
        }
      }
  
      return updatedFormData;
    });
  };
  
  const isWeekendPeriod = (fromdate, todate) => {
    const startDate = new Date(fromdate);
    const endDate = new Date(todate);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const dayOfWeek = date.getDay(); 
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        return true;
      }
    }
    return false;
  };
  

  const handleOpenCalendar = (field) => {
    setDateField(field);
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
          // alert("The 'To Date' cannot be earlier than the 'From Date'.");
          Swal.fire({
            position: "top-center",
            icon: "warning",
            title: "The 'To Date' cannot be earlier than the 'From Date'.",
            showConfirmButton: false,
            timer: 1500
          });
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else if (dateField === "fromdate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
          // alert("The 'To Date' cannot be earlier than the 'From Date'.");
          Swal.fire({
            position: "top-center",
            icon: "warning",
            title: "The 'To Date' cannot be earlier than the 'From Date'.",
            showConfirmButton: false,
            timer: 1500
          });
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else {
          const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
          updatedFormData.noofdays = noofdays;
  
          if (isWeekendPeriod(updatedFormData.fromdate, updatedFormData.todate)) {
            updatedFormData.leavecategory = "Sandwich Leave";
          }
        }
      }
  
      return updatedFormData;
    });
    setShowCalendar(false);
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/update-managerleave/${currentLeave.id}`,
        formData
      );
      setLeaves(
        leaves.map((leave) =>
          leave.id === currentLeave.id ? { ...formData } : leave
        )
      );
      setShowForm(false);
    } catch (error) {
      console.error("Error updating leave:", error);
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);

  const calculateNoOfDays = (fromdate, todate) => {
    const from = new Date(fromdate);
    const to = new Date(todate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return diffDays;
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const totalPages = Math.ceil(leaves.length / ITEMS_PER_PAGE);

  const currentItems = leaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="">Sr no</TableHead>
            <TableHead>Leave type</TableHead>
            <TableHead>Leave category</TableHead>
            <TableHead className="">From date</TableHead>
            <TableHead className="">To date</TableHead>
            <TableHead className="">No of Days</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">View</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow key={index}
            className={`
              ${leave.status === "Approved" ? "text-green-800" : 
               leave.status === "Cancelled" ? "text-red-600" : 
               leave.status === "pending" ? "text-yellow-600" : 
               "text-gray-500"}
            `}
            >
              <TableCell className="font-medium">{leave.id}</TableCell>
              <TableCell>{leave.leavetype}</TableCell>
              <TableCell>{leave.leavecategory}</TableCell>
              <TableCell className="">{leave.fromdate}</TableCell>
              <TableCell className="">{leave.todate}</TableCell>
              <TableCell className="">{leave.noofdays}</TableCell>
              <TableCell className="">{leave.reason}</TableCell>
              <TableCell className="">{leave.status}</TableCell>
              <TableCell>
                <Link to={`/manager-leavedetails/${leave.id}`}>view</Link>
              </TableCell>
              <TableCell className="">
                <div className="flex justify-around">
                  <button
                     className={`rounded text-red-600 transition ${leave.status === "Approved" ? "opacity-50 cursor-not-allowed" : ""}`}
                     onClick={() => deleteLeave(leave.id)}
                     disabled={leave.status === "Approved"}
                  >
                    <CircleX />
                  </button>
                  <Link to={`/update-managerleave/${leave.id}`}>
                  <button
                  className={`rounded text-blue-600 transition ${leave.status === "Approved" ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={leave.status === "Approved"}
                  >
                    <FilePenLine />
                  </button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        {/* Pagination  */}
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
        <Modal show={showForm} onClose={() => setShowForm(false)}>
          <form className="bg-white p-4 rounded shadow-md" onSubmit={handleUpdate}>
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
                  type=""
                  value={formData.fromdate}
                  onChange={handleChange}
                  onClick={() => handleOpenCalendar("fromdate")}
                />
                {dateField === "fromdate" && (
                  <FullScreenCalendar
                    onSelectDate={handleSelectDate}
                    onClose={() => setDateField(null)}
                  />
                )}
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
                  type=""
                  value={formData.todate}
                  onChange={handleChange}
                  onClick={() => handleOpenCalendar("todate")}
                />
                {dateField === "todate" && (
                  <FullScreenCalendar
                    onSelectDate={handleSelectDate}
                    onClose={() => setDateField(null)}
                  />
                )}
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
                type="number"
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
              <Button
                className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">
                Update
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


