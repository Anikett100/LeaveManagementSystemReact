


// import React, { useState, useEffect } from "react";
// import { CircleX, CircleCheckBig, FilePenLine } from "lucide-react";
// import axios from "axios";

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
//   const [updateLeaves, setupdateLeaves] = useState([]);

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



//   const updateLeave = async (id) => {
//     try {
//       await axios.put(`http://127.0.0.1:8000/api/update-leave/${id}`);
//       setupdateLeaves(leaves.filter((leave) => leave.id !== id));
//     } catch (error) {
//       console.error("Error updating leave:", error);
//     }
//   };

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/get-leave")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Fetched data:", data);
//         setLeaves(data);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="container-fluid">
//       <Table className="mt-5">
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[200px]">Sr no</TableHead>
//             <TableHead>Leave type</TableHead>
//             <TableHead>Leave category</TableHead>
//             <TableHead className="">From date</TableHead>
//             <TableHead className="">To date</TableHead>
//             <TableHead className="">No of Days</TableHead>
//             <TableHead className="">Reason</TableHead>
//             <TableHead className="">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {leaves.map((leave, index) => (
//             <TableRow key={index}>
//               <TableCell className="font-medium">{leave.id}</TableCell>
//               <TableCell>{leave.leavetype}</TableCell>
//               <TableCell>{leave.leavecategory}</TableCell>
//               <TableCell className="">{leave.fromdate}</TableCell>
//               <TableCell className="">{leave.todate}</TableCell>
//               <TableCell className="">{leave.noofdays}</TableCell>
//               <TableCell className="">{leave.reason}</TableCell>
//               <TableCell className="">
//                 <div className="flex justify-around">
//                   <button
//                     className="rounded text-slate-600 transition"
//                     onClick={() => deleteLeave(leave.id)}
//                   >
//                     <CircleX />
//                   </button>
//                   <button className="rounded text-black transition"
//                   onClick={()=>updateLeave(leave.id)}>
//                     <FilePenLine />
//                   </button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { CircleX, FilePenLine } from "lucide-react";
// import axios from "axios";
// import Modal from "./Modal";
// import { Button } from "../ui/Button";

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
//   const [showForm, setShowForm] = useState(false);
//   const [currentLeave, setCurrentLeave] = useState(null);
//   const [formData, setFormData] = useState({
//     leaveCategory: '',
//     leaveType: '',
//     fromDate: '',
//     toDate: '',
//     noOfDays: '',
//     reason: '',
//   });

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/get-leave");
//       setLeaves(response.data);
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

//   const handleEditClick = (leave) => {
//     setCurrentLeave(leave);
//     setFormData(leave);
//     setShowForm(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`http://127.0.0.1:8000/api/update-leave/${currentLeave.id}`, formData);
//       setLeaves(leaves.map((leave) => (leave.id === currentLeave.id ? formData : leave)));
//       setShowForm(false);
//     } catch (error) {
//       console.error("Error updating leave:", error);
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
//             <TableHead className="w-[200px]">Sr no</TableHead>
//             <TableHead>Leave type</TableHead>
//             <TableHead>Leave category</TableHead>
//             <TableHead className="">From date</TableHead>
//             <TableHead className="">To date</TableHead>
//             <TableHead className="">No of Days</TableHead>
//             <TableHead className="">Reason</TableHead>
//             <TableHead className="">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {leaves.map((leave, index) => (
//             <TableRow key={index}>
//               <TableCell className="font-medium">{leave.id}</TableCell>
//               <TableCell>{leave.leavetype}</TableCell>
//               <TableCell>{leave.leavecategory}</TableCell>
//               <TableCell className="">{leave.fromdate}</TableCell>
//               <TableCell className="">{leave.todate}</TableCell>
//               <TableCell className="">{leave.noofdays}</TableCell>
//               <TableCell className="">{leave.reason}</TableCell>
//               <TableCell className="">
//                 <div className="flex justify-around">
//                   <button
//                     className="rounded text-slate-600 transition"
//                     onClick={() => deleteLeave(leave.id)}
//                   >
//                     <CircleX />
//                   </button>
//                   <button
//                     className="rounded text-black transition"
//                     onClick={() => handleEditClick(leave)}
//                   >
//                     <FilePenLine />
//                   </button>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       {showForm && (
//         <Modal show={showForm} onClose={() => setShowForm(false)}>
//           <form className="bg-white p-4 rounded shadow-md" onSubmit={handleUpdate}>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveType">
//                 Leave Category
//               </label>
//               <select
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="leaveType"
//                 name="leaveCategory"
//                 value={formData.leaveCategory}
//                 onChange={handleChange}
//               >
//                 <option value=""></option>
//                 <option value="Casual Leave">Casual Leave</option>
//                 <option value="Sick Leave">Sick Leave</option>
//                 <option value="Sandwich Leave">Sandwich Leave</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leaveCategory">
//                 Leave Type
//               </label>
//               <select
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="leaveCategory"
//                 name="leaveType"
//                 value={formData.leaveType}
//                 onChange={handleChange}
//               >
//                 <option value=""></option>
//                 <option value="Full Day">Full Day</option>
//                 <option value="First Half">First Half</option>
//                 <option value="Second Half">Second Half</option>
//                 <option value="Short Leave">Short Leave</option>
//               </select>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromDate">
//                 From Date
//               </label>
//               <div className="relative">
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="fromDate"
//                   name="fromDate"
//                   type="date"
//                   value={formData.fromDate}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="toDate">
//                 To Date
//               </label>
//               <div className="relative">
//                 <input
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   id="toDate"
//                   name="toDate"
//                   type="date"
//                   value={formData.toDate}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noOfDays">
//                 No of Days
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="noOfDays"
//                 name="noOfDays"
//                 type="number"
//                 value={formData.noOfDays}
//                 readOnly
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
//                 Reason
//               </label>
//               <textarea
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="reason"
//                 name="reason"
//                 value={formData.reason}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <Button className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//                 Update
//               </Button>
//             </div>
//           </form>
//         </Modal>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { CircleX, FilePenLine } from "lucide-react";
import axios from "axios";
import Modal from "./Modal";
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

export function TableDemo() {
  const [leaves, setLeaves] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [formData, setFormData] = useState({
    leaveCategory: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    noOfDays: "",
    reason: "",
  });
  const [dateField, setDateField] = useState(null);

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

  const handleEditClick = (leave) => {
    setCurrentLeave(leave);
    setFormData({
      ...leave, 
      fromDate: leave.fromdate, 
      toDate: leave.todate, 
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOpenCalendar = (field) => {
    setDateField(field);
  };

  const handleSelectDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      [dateField]: formattedDate,
    }));
    setDateField(null); 
  };

  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post(
  //       `http://127.0.0.1:8000/api/update-leave/${currentLeave.id}`,
  //       formData
  //     );
  //     setLeaves(
  //       leaves.map((leave) =>
  //         leave.id === currentLeave.id ? { ...formData } : leave
  //       )
  //     );
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error("Error updating leave:", error);
  //   }
  // };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/update-leave/${currentLeave.id}`,
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

  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Sr no</TableHead>
            <TableHead>Leave type</TableHead>
            <TableHead>Leave category</TableHead>
            <TableHead className="">From date</TableHead>
            <TableHead className="">To date</TableHead>
            <TableHead className="">No of Days</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{leave.id}</TableCell>
              <TableCell>{leave.leavetype}</TableCell>
              <TableCell>{leave.leavecategory}</TableCell>
              <TableCell className="">{leave.fromdate}</TableCell>
              <TableCell className="">{leave.todate}</TableCell>
              <TableCell className="">{leave.noofdays}</TableCell>
              <TableCell className="">{leave.reason}</TableCell>
              <TableCell className="">
                <div className="flex justify-around">
                  <button
                    className="rounded text-slate-600 transition"
                    onClick={() => deleteLeave(leave.id)}
                  >
                    <CircleX />
                  </button>
                  <button
                    className="rounded text-black transition"
                    onClick={() => handleEditClick(leave)}
                  >
                    <FilePenLine />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showForm && (
        <Modal show={showForm} onClose={() => setShowForm(false)}>
          <form className="bg-white p-4 rounded shadow-md" onSubmit={handleUpdate}>
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
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
              >
             
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
                  type=""
                  value={formData.fromDate}
                  onChange={handleChange}
                  onClick={() => handleOpenCalendar("fromDate")}
                />
                {dateField === "fromDate" && (
                  <FullScreenCalendar
                    onSelectDate={handleSelectDate}
                    onClose={() => setDateField(null)}
                  />
                )}
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
                  type=""
                  value={formData.toDate}
                  onChange={handleChange}
                  onClick={() => handleOpenCalendar("toDate")}
                />
                {dateField === "toDate" && (
                  <FullScreenCalendar
                    onSelectDate={handleSelectDate}
                    onClose={() => setDateField(null)}
                  />
                )}
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
                type="number"
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
              <Button
                className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
