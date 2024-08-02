// // import axios from 'axios';
// // import React from 'react'
// // import Header from './Header';
// // import Footer from './Footer';

// // function LeaveDetails() {
// //     const [leaves, setLeaves] = useState([]);
// //     const fetchLeaves = async () => {
// //         try {
// //           const response = await axios.get("http://127.0.0.1:8000/api/get-leave");
// //           setLeaves(response.data);
// //           fetchLeaves();
// //         } catch (error) {
// //           console.error("Error fetching data:", error);
// //         }
// //       };
// //   return (
// //     <>
// //    <Header/>

// //    <Footer/>  
// //    </>  
// //   )
// // }

// // export default LeaveDetails



// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom'; 
// import Header from './Header';
// import Footer from './Footer';

// function UserLeaveDetails() {
//   const { id } = useParams(); 
//   console.log(id)
//   const [leave, setLeave] = useState(null);
//   console.log(leave)
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLeave = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/leave-details/${id}`);
//         setLeave(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         setError(error);
//          setLoading(false);
//       }
//     };

//     fetchLeave();
//   }, [id]); 

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading leave details</div>;
//   }

//   if (!leave) {
//     return <div>No leave details found</div>;
//   }

//   return (
//     <>
//       <Header />
//       <div className="container content-center mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
//         <h1 className="text-2xl font-bold mb-6">Leave Details</h1>
//         <div className="mb-4">
//           <p className="font-semibold">Leave Type:</p>
//           <p>{leave.leavetype}</p>
//         </div>
//         <div className="mb-4 flex">
//           <p className="font-semibold">Leave Category:</p>
//           <p>{leave.leavecategory}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">Sandwich Leave:</p>
//           <p>{leave.issandwich ? 'Yes' : 'No'}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">From Date:</p>
//           <p>{leave.fromdate}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">To Date:</p>
//           <p>{leave.todate}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">Number of Days:</p>
//           <p>{leave.noofdays}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">Reason:</p>
//           <p>{leave.reason}</p>
//         </div>
//         <div className="mb-4">
//           <p className="font-semibold">Status:</p>
//           <p>{leave.status}</p>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default UserLeaveDetails;



import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import Header from './Header';
import Footer from './Footer';

function UserLeaveDetails() {
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
      <Header />
      <div className="container mx-auto my-8 p-6 m">
        <h1 className="text-3xl font-bold mb-6 text-center">Leave Details</h1>
       <hr></hr>
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
      <Footer/>
    </>
  );
}

export default UserLeaveDetails;
