
// import React, { useEffect, useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
// import axios from "axios";
// import AdminModal from "./ReasonModal";
// import { Link } from "react-router-dom";

// export function LeaveRequestTable() {
//   const [leaves, setLeaves] = useState([]);
//   const [showReason, setShowReason] = useState(false);
//   const [currentAction, setCurrentAction] = useState({ status: "", id: null });
//   const [actionReason, setActionReason] = useState("");

//   const fetchLeaves = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/get-adminleaves");
//       setLeaves(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleStatusChange = (status, id) => {
//     setCurrentAction({ status, id });
//     setShowReason(true);
//   };

//   const handleSubmitReason = async () => {
//     setShowReason(false);
//     try {
//       await axios.post(`http://127.0.0.1:8000/api/update-leavestatus/${currentAction.id}`, {
//         status: currentAction.status,
//         actionreason: actionReason,
//       });
//       fetchLeaves();
//     } catch (error) {
//       console.error(`Error updating leave status:`, error);
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
//             <TableHead className="font-medium text-black">Sr no</TableHead>
//             <TableHead className="font-medium text-black">Name</TableHead>
//             <TableHead className="font-medium text-black">Leave type</TableHead>
//             <TableHead className="font-medium text-black">Leave category</TableHead>
//             <TableHead className="font-medium text-black">Sandwich Leave</TableHead>
//             <TableHead className="font-medium text-black">From date</TableHead>
//             <TableHead className="font-medium text-black">To date</TableHead>
//             <TableHead className="font-medium text-black">No of Days</TableHead>
//             <TableHead className="font-medium text-black">Status</TableHead>
//             <TableHead className="font-medium text-black">Details</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {leaves.map((leave, index) => (
//             <TableRow key={leave.id}>
//               <TableCell className="font-medium">{index + 1}</TableCell>
//               <TableCell>{leave.user?.name || 'N/A'}</TableCell>
//               <TableCell>{leave.leavetype}</TableCell>
//               <TableCell>{leave.leavecategory}</TableCell>
//               <TableCell>{leave.issandwich}</TableCell>
//               <TableCell>{leave.fromdate}</TableCell>
//               <TableCell>{leave.todate}</TableCell>
//               <TableCell>{leave.noofdays}</TableCell>
//               <TableCell>
//                 <select
//                   className="border rounded px-2 py-1"
//                   value={leave.status}
//                   onChange={(e) => handleStatusChange(e.target.value, leave.id)}
//                 >
//                   <option value={leave.status}>{leave.status}</option>
//                   {leave.status !== "Approved" && <option value="Approved">Approved</option>}
//                   {leave.status !== "Cancelled" && <option value="Cancelled">Cancelled</option>}
//                 </select>
//               </TableCell>
//               <TableCell>
//                 <Link to={`/admin-leavedetails/${leave.id}`}>view</Link>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <AdminModal show={showReason} onClose={() => setShowReason(false)}>
//         <div>
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actionreason">
//             Reason
//           </label>
//           <textarea
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="actionreason"
//             name="actionreason"
//             value={actionReason}
//             onChange={(e) => setActionReason(e.target.value)}
//           />
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={() => setShowReason(false)}
//               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-700"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmitReason}
//               className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-700"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </AdminModal>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/Table";
import axios from "axios";
import AdminModal from "./ReasonModal";
import { Link } from "react-router-dom";

export function LeaveRequestTable() {
  const [leaves, setLeaves] = useState([]);
  const [showReason, setShowReason] = useState(false);
  const [currentAction, setCurrentAction] = useState({ status: "", id: null });
  const [actionReason, setActionReason] = useState("");

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-adminleaves");
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStatusChange = (status, id) => {
    setCurrentAction({ status, id });
    setShowReason(true);
  };

  const handleSubmitReason = async () => {
    setShowReason(false);
    try {
      await axios.post(`http://127.0.0.1:8000/api/update-leavestatus/${currentAction.id}`, {
        status: currentAction.status,
        actionreason: actionReason,
      });
      fetchLeaves(); 
    } catch (error) {
      console.error(`Error updating leave status:`, error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-red-400 text-white";
      case "Pending":
        return "bg-yellow-500 text-black";
      default:
        return "";
    }
  };

  return (
    <div className="container-fluid mb-10">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-black">Sr no</TableHead>
            <TableHead className="font-medium text-black">Name</TableHead>
            <TableHead className="font-medium text-black">Leave type</TableHead>
            <TableHead className="font-medium text-black">Leave category</TableHead>
            <TableHead className="font-medium text-black">Sandwich Leave</TableHead>
            <TableHead className="font-medium text-black">From date</TableHead>
            <TableHead className="font-medium text-black">To date</TableHead>
            <TableHead className="font-medium text-black">No of Days</TableHead>
            <TableHead className="font-medium text-black">Status</TableHead>
            <TableHead className="font-medium text-black">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow key={leave.id}
            className={`
              ${leave.status === "Approved" ? "text-green-800" : 
               leave.status === "Cancelled" ? "text-red-600" : 
               leave.status === "pending" ? "text-yellow-600" : 
               "text-gray-500"}
            `}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{leave.user?.name || 'N/A'}</TableCell>
              <TableCell>{leave.leavetype}</TableCell>
              <TableCell>{leave.leavecategory}</TableCell>
              <TableCell>{leave.issandwich}</TableCell>
              <TableCell>{leave.fromdate}</TableCell>
              <TableCell>{leave.todate}</TableCell>
              <TableCell>{leave.noofdays}</TableCell>
              <TableCell>
                <select
                  className={`border rounded px-2 py-1 ${getStatusClass(leave.status)}`}
                  value={leave.status}
                  onChange={(e) => handleStatusChange(e.target.value, leave.id)}
                >
                  <option value={leave.status}>{leave.status}</option>
                  {leave.status !== "Approved" && <option value="Approved">Approved</option>}
                  {leave.status !== "Cancelled" && <option value="Cancelled">Cancelled</option>}
                </select>
              </TableCell>
              <TableCell>
                <Link to={`/admin-leavedetails/${leave.id}`}>view</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AdminModal show={showReason} onClose={() => setShowReason(false)}>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actionreason">
            Reason
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="actionreason"
            name="actionreason"
            value={actionReason}
            onChange={(e) => setActionReason(e.target.value)}
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowReason(false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:bg-red-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitReason}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
}




