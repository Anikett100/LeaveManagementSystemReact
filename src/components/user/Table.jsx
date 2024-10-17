import React, { useState, useEffect } from "react";
import { CircleX, FilePenLine } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/Table";
import Swal from "sweetalert2";

const ITEMS_PER_PAGE = 4; 
const baseURL = process.env.REACT_APP_API_BASE_URL;

export function TableDemo() {
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      });
      setLeaves(response.data.filter(leaves => leaves.id !== null));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const deleteLeave = async (id) => {
  //   const confirmed = window.confirm("Are you sure you want to delete this leave?");
  //   if (!confirmed) {
  //     return;
  //   }
  //   try {
  //     await axios.delete(`${baseURL}/delete-leave/${id}`);
  //     setLeaves(leaves.filter((leave) => leave.id !== id));
  //   } catch (error) {
  //     if (error.response && error.response.status === 403) {
  //       Swal.fire({
  //         position: "top-center",
  //         icon: "warning",
  //         title: "You cannot delete this leave as it has been approved by the admin.",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     } else {
  //       console.error("Error deleting leave:", error);
  //       alert("An error occurred while trying to delete the leave.");
  //     }
  //   }
  // };

  const deleteLeave = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this leave?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });
  
    if (!confirmed.isConfirmed) {
      return;
    }
  
  
    Swal.fire({
      title: 'Deleting leave...',
      icon: 'info',
      showConfirmButton: false,
      timer: 1500
    });
  
    try {
      await axios.delete(`${baseURL}/delete-leave/${id}`);
      setLeaves(leaves.filter((leave) => leave.id !== id));
  
      Swal.fire({
        title: 'Deleted!',
        text: 'Leave deleted successfully!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        Swal.fire({
          title: 'Warning!',
          text: 'You cannot delete this leave as it has been approved by the admin.',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        console.error("Error deleting leave:", error);
        Swal.fire({
          title: 'Error!',
          text: 'An error occurred while trying to delete the leave.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    }
  };
  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);
  
  const totalPages = Math.ceil(leaves.length / ITEMS_PER_PAGE);

  const currentItems = leaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container-fluid ">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Sr No</TableHead>
            <TableHead className="text-black">Leave Type</TableHead>
            <TableHead className="text-black">Leave Category</TableHead>
            <TableHead className="text-black">Is Sandwich</TableHead>
            <TableHead className="text-black">From Date</TableHead>
            <TableHead className="text-black">To Date</TableHead>
            <TableHead className="text-black">No Of Days</TableHead>
            <TableHead className="text-black">Status</TableHead>
            <TableHead className="text-black">Details</TableHead>
            <TableHead className="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((leave, index) => (
            <TableRow
              key={index}
              className={`
                ${leave.status === "Approved" ? "text-green-800" : 
                 leave.status === "Cancelled" ? "text-red-600" : 
                 leave.status === "Pending" ? "text-yellow-600" : 
                 "text-gray-500"}
              `}
            >
              <TableCell>{leave.id}</TableCell>
              <TableCell>{leave.leavetype}</TableCell>
              <TableCell>{leave.leavecategory}</TableCell>
              <TableCell>{leave.issandwich}</TableCell>
              <TableCell>{leave.fromdate}</TableCell>
              <TableCell>{leave.todate}</TableCell>
              <TableCell>{leave.noofdays}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                <Link to={`/leave-details/${leave.id}`}>view</Link>
              </TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <button
                    className={`rounded text-red-600 transition ${leave.status === "Approved" ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => deleteLeave(leave.id)}
                    disabled={leave.status === "Approved"}
                  >
                    <CircleX />
                  </button>
                  <Link to={`/update-leave/${leave.id}`}>
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
    </div>
  );
}
