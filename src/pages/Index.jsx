
// import React, { useState } from "react";
// import { TableDemo } from "../components/user/Table";
// import Footer from "../components/user/Footer";
// import Header from "../components/user/Header";
// import { Button } from "../components/ui/Button";
// import { CirclePlus } from "lucide-react";
// import Modal from "../components/user/Modal";
// import FullScreenCalendar from "../components/Calender";
// import { Link } from "react-router-dom";
// import axios from 'axios'; 
// import { MultiSelect } from "react-multi-select-component";

// export default function Index() {
//   const [error, setError] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);
//   const [dateField, setDateField] = useState(null);
//   const [selected, setSelected] = useState([]);
//   const [disableOptions, setDisableOptions] = useState(false);

//   const [formData, setFormData] = useState({
//     leavecategory: '',
//     leavetype: '',
//     cc: [],
//     fromdate: '',
//     todate: '',
//     noofdays: '',
//     reason: '',
//     user_id:''
//   });

//   const handleApplyLeaveClick = () => {
//     setShowForm(true);
//   };
  
//   const handleCloseModal = () => {
//     setShowForm(false);
//   };

//   const handleOpenCalendar = (field) => {
//     setDateField(field);
//     setShowCalendar(true);
//   };

//   const handleSelectDate = (date) => {
//     const formattedDate = date.toISOString().split("T")[0];
//     setFormData((prevFormData) => {
//       const updatedFormData = {
//         ...prevFormData,
//         [dateField]: formattedDate,
//       };
//       if (dateField === "todate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
//         alert("The 'To Date' cannot be earlier than the 'From Date'.");
//         updatedFormData.todate = "";
//         updatedFormData.noofdays = "";
//         setDisableOptions(false);
//       } else if (dateField === "fromdate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
//         alert("The 'To Date' cannot be earlier than the 'From Date'.");
//         updatedFormData.todate = "";
//         updatedFormData.noofdays = "";
//         setDisableOptions(false);
//       } else {
//         const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
//         updatedFormData.noofdays = noofdays;
//         setDisableOptions(new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate));
//         if (new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate)) {
//           updatedFormData.leavetype = 'Full Day'; 
//         }
//       }
//       return updatedFormData;
//     });
//     setShowCalendar(false);
//   };



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => {
//       const updatedFormData = {
//         ...prevFormData,
//         [name]: value,
//       };
//       if ((name === "fromdate" || name === "todate") && updatedFormData.fromdate && updatedFormData.todate) {
//         if (new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
//           alert("The 'To Date' cannot be earlier than the 'From Date'.");
//           updatedFormData.todate = "";
//           updatedFormData.noofdays = "";
//           setDisableOptions(false);
//         } else if (new Date(updatedFormData.todate) < new Date()) {
//           alert("The 'To Date' cannot be in the past.");
//           updatedFormData.todate = "";
//           updatedFormData.noofdays = "";
//           setDisableOptions(false);
//         } else {
//           const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
//           updatedFormData.noofdays = noofdays;
//           setDisableOptions(new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate));
//           if (new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate)) {
//             updatedFormData.leavetype = 'Full Day'; 
//           }
//         }
//       }
//       return updatedFormData;
//     });
//   };

//   const handleSelectChange = (selectedOptions) => {
//     setSelected(selectedOptions);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       cc: selectedOptions.map(option => option.value) 
//     }));
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem('user_id');
//     const authToken = localStorage.getItem('token');    
//     const leaveData = {
//       ...formData,
//       user_id: userId,
//     };

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/api/add-leave', leaveData, {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });
//       alert("Leave request sent successfully");
//       setShowForm(false);
//     } catch (error) {
//       setError('Error submitting leave request');
//       console.error('Error:', error);
//     }
//   };

//   const options = [
//     { label: "sankalp@ycstech.in", value: "sankalp@ycstech.in" },
//     { label: "kartik@ycstech.in", value: "kartik@ycstech.in" },
//     { label: "design@ycstech.in", value: "design@ycstech.in" },
//   ];

//   const calculateNoOfDays = (fromdate, todate) => {
//     const from = new Date(fromdate);
//     const to = new Date(todate);
//     const diffTime = Math.abs(to - from);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays;
//   };

//   return (
//     <>
//       <Header />
//       <div className="container">
//         <div className="flex justify-end mt-4 space-x-2">
//           <Button className="bg-[#484C7F] flex items-center" onClick={handleApplyLeaveClick}>
//             <CirclePlus className="w-5 h-5 mr-2" />
//             Apply Leave
//           </Button>
          
//           <Link to='/user-holidays'>
//             <Button className="bg-[#FF6347] flex items-center">
//               Holidays
//             </Button>
//           </Link>
//         </div>
//       </div>
//       <Modal show={showForm} onClose={handleCloseModal}>
//         <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leavecategory">
//               Leave Category
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="leavecategory"
//               name="leavecategory"
//               value={formData.leavecategory}
//               onChange={handleChange}
//             >
//               <option value=""></option>
//               <option value="Casual Leave">Casual Leave</option>
//               <option value="Sick Leave">Sick Leave</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="leavetype">
//               Leave Type
//             </label>
//             <select
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="leavetype"
//               name="leavetype"
//               value={formData.leavetype}
//               onChange={handleChange}
//             >
//               <option value=""></option>
//               <option value="Full Day">Full Day</option>
//               <option value="First Half" disabled={disableOptions} >First Half</option>
//               <option value="Second Half" disabled={disableOptions}>Second Half</option>
//               <option value="Short Leave" disabled={disableOptions}>Short Leave</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cc">
//               Mail CC
//             </label>
//             <div>
//               <MultiSelect
//                 options={options}
//                 value={selected}
//                 onChange={handleSelectChange} 
//                 labelledBy="Select"
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fromdate">
//               From Date
//             </label>
//             <div className="relative">
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="fromdate"
//                 name="fromdate"
//                 type="text"
//                 value={formData.fromdate}
//                 onClick={() => handleOpenCalendar("fromdate")}
//                 readOnly
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="todate">
//               To Date
//             </label>
//             <div className="relative">
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="todate"
//                 name="todate"
//                 type="text"
//                 value={formData.todate}
//                 onClick={() => handleOpenCalendar("todate")}
//                 readOnly
//               />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="noofdays">
//               No of Days
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="noofdays"
//               name="noofdays"
//               type="text"
//               value={formData.noofdays}
//               readOnly
//             />
//           </div>
//           <div className="mb-4">
//            < label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reason">
//               Reason
//             </label>
//             <textarea
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="reason"
//               name="reason"
//               value={formData.reason}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="flex items-center justify-between">
//             <Button className="bg-[#484C7F] text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
//               Submit
//             </Button>
//           </div>
//         </form>
//       </Modal>
//       {showCalendar && (
//         <FullScreenCalendar onClose={() => setShowCalendar(false)} onSelectDate={handleSelectDate} />
//       )}
//       <div className="container">
//         <TableDemo />
//       </div>
//       <Footer />
//     </>
//   );
// }






import React, { useState } from "react";
import { TableDemo } from "../components/user/Table";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import { Button } from "../components/ui/Button";
import { CirclePlus } from "lucide-react";
import Modal from "../components/user/Modal";
import FullScreenCalendar from "../components/Calender";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import { MultiSelect } from "react-multi-select-component";

export default function Index() {
  // const [error, setError] = useState('');
  // const [showForm, setShowForm] = useState(false);
  // const [showCalendar, setShowCalendar] = useState(false);
  // const [dateField, setDateField] = useState(null);
  // const [selected, setSelected] = useState([]);
  // const [disableOptions, setDisableOptions] = useState(false);

  // const [formData, setFormData] = useState({
  //   leavecategory: '',
  //   leavetype: '',
  //   cc: [],
  //   fromdate: '',
  //   todate: '',
  //   noofdays: '',
  //   reason: '',
  //   user_id:''
  // });

  // const handleApplyLeaveClick = () => {
  //   setShowForm(true);
  // };
  
  // const handleCloseModal = () => {
  //   setShowForm(false);
  // };

  // const handleOpenCalendar = (field) => {
  //   setDateField(field);
  //   setShowCalendar(true);
  // };

  // const handleSelectDate = (date) => {
  //   const formattedDate = date.toISOString().split("T")[0];
  //   setFormData((prevFormData) => {
  //     const updatedFormData = {
  //       ...prevFormData,
  //       [dateField]: formattedDate,
  //     };
  //     if (dateField === "todate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
  //       alert("The 'To Date' cannot be earlier than the 'From Date'.");
  //       updatedFormData.todate = "";
  //       updatedFormData.noofdays = "";
  //       setDisableOptions(false);
  //     } else if (dateField === "fromdate" && new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
  //       alert("The 'To Date' cannot be earlier than the 'From Date'.");
  //       updatedFormData.todate = "";
  //       updatedFormData.noofdays = "";
  //       setDisableOptions(false);
  //     } else {
  //       const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
  //       updatedFormData.noofdays = noofdays;
  //       setDisableOptions(new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate));
  //       if (new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate)) {
  //         updatedFormData.leavetype = 'Full Day'; 
  //       }
  //     }
  //     return updatedFormData;
  //   });
  //   setShowCalendar(false);
  // };



  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => {
  //     const updatedFormData = {
  //       ...prevFormData,
  //       [name]: value,
  //     };
  //     if ((name === "fromdate" || name === "todate") && updatedFormData.fromdate && updatedFormData.todate) {
  //       if (new Date(updatedFormData.todate) < new Date(updatedFormData.fromdate)) {
  //         alert("The 'To Date' cannot be earlier than the 'From Date'.");
  //         updatedFormData.todate = "";
  //         updatedFormData.noofdays = "";
  //         setDisableOptions(false);
  //       } else if (new Date(updatedFormData.todate) < new Date()) {
  //         alert("The 'To Date' cannot be in the past.");
  //         updatedFormData.todate = "";
  //         updatedFormData.noofdays = "";
  //         setDisableOptions(false);
  //       } else {
  //         const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
  //         updatedFormData.noofdays = noofdays;
  //         setDisableOptions(new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate));
  //         if (new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate)) {
  //           updatedFormData.leavetype = 'Full Day'; 
  //         }
  //       }
  //     }
  //     return updatedFormData;
  //   });
  // };

  // const handleSelectChange = (selectedOptions) => {
  //   setSelected(selectedOptions);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     cc: selectedOptions.map(option => option.value) 
  //   }));
  // };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userId = localStorage.getItem('user_id');
  //   const authToken = localStorage.getItem('token');    
  //   const leaveData = {
  //     ...formData,
  //     user_id: userId,
  //   };

  //   try {
  //     const response = await axios.post('http://127.0.0.1:8000/api/add-leave', leaveData, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     alert("Leave request sent successfully");
  //     setShowForm(false);
  //   } catch (error) {
  //     setError('Error submitting leave request');
  //     console.error('Error:', error);
  //   }
  // };

  // const options = [
  //   { label: "sankalp@ycstech.in", value: "sankalp@ycstech.in" },
  //   { label: "kartik@ycstech.in", value: "kartik@ycstech.in" },
  //   { label: "design@ycstech.in", value: "design@ycstech.in" },
  // ];

  // const calculateNoOfDays = (fromdate, todate) => {
  //   const from = new Date(fromdate);
  //   const to = new Date(todate);
  //   const diffTime = Math.abs(to - from);
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  //   return diffDays;
  // };

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex justify-end mt-4 space-x-2">
          {/* <Button className="bg-[#484C7F] flex items-center" onClick={handleApplyLeaveClick}>
            <CirclePlus className="w-5 h-5 mr-2" />
            Apply Leave
          </Button> */}
           <Link to='/apply-leave'>
          <Button className="bg-[#484C7F] flex items-center" >
            <CirclePlus className="w-5 h-5 mr-2" />
            Apply Leave
          </Button>
          </Link>
          
          <Link to='/user-holidays'>
            <Button className="bg-[#FF6347] flex items-center">
              Holidays
            </Button>
          </Link>
        </div>
      </div>
      {/* <Modal show={showForm} onClose={handleCloseModal}>
         <FullScreenCalendar/>
      </Modal> */}
      <div className="container">
        <TableDemo />
      </div>
      <Footer />
    </>
  );
}
