
// import React, { useState, useEffect } from "react";
// import { CircleX, FilePenLine } from "lucide-react";
// import axios from "axios";
// import Modal from "./Modal";
// import { Button } from "../ui/Button";
// import FullScreenCalendar from "../Calender";
// import { MultiSelect } from "react-multi-select-component";
// import { Link } from "react-router-dom";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/Table";


// export function TableDemo() {
//   const [leaves, setLeaves] = useState([]);
//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/get-leave");
//       setLeaves(response.data);
//      fetchLeaves();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const deleteLeave = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this leave?");
//     if (!confirmed) {
//       return;
//     }

//     try {
//       await axios.delete(`http://127.0.0.1:8000/api/delete-leave/${id}`);
//       setLeaves(leaves.filter((leave) => leave.id !== id));
//     } catch (error) {
//       console.error("Error deleting leave:", error);
//     }
//   };

 

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   return (
//     <div className="container-fluid">
//       <Table className="mt-5">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-black">Sr no</TableHead>
//             <TableHead className="text-black">Leave type</TableHead>
//             <TableHead className="text-black">Leave category</TableHead>
//             <TableHead className="text-black">Is sandwich</TableHead>
//             <TableHead className="text-black"> Date</TableHead>
//             <TableHead className="text-black">No of Days</TableHead>
//             {/* <TableHead className="text-black">Reason</TableHead> */}
//             <TableHead className="text-black">Status</TableHead>          
//             <TableHead className="text-black">Details</TableHead>          
//             <TableHead className="text-black">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {leaves.map((leave, index) => (
//             <TableRow key={index}>
//               <TableCell className="">{leave.id}</TableCell>
//               <TableCell>{leave.leavetype}</TableCell>
//               <TableCell>{leave.leavecategory}</TableCell>
//               <TableCell className="">{leave.issandwich}</TableCell>
//               <TableCell className="">{leave.daterange}</TableCell>
//               <TableCell className="">{leave.noofdays}</TableCell>
//               {/* <TableCell className="">{leave.reason}</TableCell> */}
//               <TableCell className="">{leave.status}</TableCell>
//               <TableCell className="">
//               <Link to={`/leave-details/${leave.id}`} >view</Link>
//               </TableCell>
     
//               <TableCell className="">
//                 <div className="flex justify-around">
//                   <button
//                     className="rounded text-slate-600 transition"
//                      onClick={() => deleteLeave(leave.id)}
//                   >
//                     <CircleX />
//                   </button>
//                   <Link to={`/update-leave/${leave.id}`}>
//                   <button
//                     className="rounded text-black transition"
//                   >
//                     <FilePenLine />
//                   </button>
//                   </Link> 
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }






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

const ITEMS_PER_PAGE = 5; // Number of items per page

export function TableDemo() {
  const [leaves, setLeaves] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-leave");
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
      await axios.delete(`http://127.0.0.1:8000/api/delete-leave/${id}`);
      setLeaves(leaves.filter((leave) => leave.id !== id));
    } catch (error) {
      console.error("Error deleting leave:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // Calculate total number of pages
  const totalPages = Math.ceil(leaves.length / ITEMS_PER_PAGE);

  // Get the current items to display
  const currentItems = leaves.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Sr no</TableHead>
            <TableHead className="text-black">Leave type</TableHead>
            <TableHead className="text-black">Leave category</TableHead>
            <TableHead className="text-black">Is sandwich</TableHead>
            <TableHead className="text-black">Date</TableHead>
            <TableHead className="text-black">No of Days</TableHead>
            <TableHead className="text-black">Status</TableHead>
            <TableHead className="text-black">Details</TableHead>
            <TableHead className="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((leave, index) => (
            <TableRow key={index}>
              <TableCell>{leave.id}</TableCell>
              <TableCell>{leave.leavetype}</TableCell>
              <TableCell>{leave.leavecategory}</TableCell>
              <TableCell>{leave.issandwich}</TableCell>
              <TableCell>{leave.daterange}</TableCell>
              <TableCell>{leave.noofdays}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                <Link to={`/leave-details/${leave.id}`}>view</Link>
              </TableCell>
              <TableCell>
                <div className="flex justify-around">
                  <button
                    className="rounded text-slate-600 transition"
                    onClick={() => deleteLeave(leave.id)}
                  >
                    <CircleX />
                  </button>
                  <Link to={`/update-leave/${leave.id}`}>
                    <button className="rounded text-black transition">
                      <FilePenLine />
                    </button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
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
