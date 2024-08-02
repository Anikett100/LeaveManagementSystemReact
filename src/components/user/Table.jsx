
import React, { useState, useEffect } from "react";
import { CircleX, FilePenLine } from "lucide-react";
import axios from "axios";
import Modal from "./Modal";
import { Button } from "../ui/Button";
import FullScreenCalendar from "../Calender";
import { MultiSelect } from "react-multi-select-component";
import { Link } from "react-router-dom";
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
  console.log(leaves)
  const [showForm, setShowForm] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
    const [selected, setSelected] = useState([]);
    const [disableOptions, setDisableOptions] = useState(false);
  const [formData, setFormData] = useState({
    leavecategory: "",
    leavetype: "",
    issandwich:"",
    cc:'',
    fromdate: "",
    todate: "",
    noofdays: "",
    reason: "",
    status:"",
    user_id:""
  });
  const [dateField, setDateField] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-leave");
      setLeaves(response.data);
     fetchLeaves();
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
      fromdate: leave.fromdate, 
      todate: leave.todate,
      user_id: leave.user_id, 
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
          alert("The 'To Date' cannot be earlier than the 'From Date'.");
          updatedFormData.todate = "";
          updatedFormData.noofdays = "";
        } else {
          const noofdays = calculateNoOfDays(updatedFormData.fromdate, updatedFormData.todate);
          updatedFormData.noofdays = noofdays;
          setDisableOptions(new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate));
          if (new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate)) {
            updatedFormData.leavetype = 'Full Day'; 
          }
        }
      }
  
      return updatedFormData;
    });
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
          setDisableOptions(new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate));
          if (new Date(updatedFormData.fromdate) < new Date(updatedFormData.todate)) {
            updatedFormData.leavetype = 'Full Day'; 
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

  const calculateNoOfDays = (fromdate, todate) => {
    const from = new Date(fromdate);
    const to = new Date(todate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 
    return diffDays;
  };
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setFormData((prevFormData) => ({
      ...prevFormData,
      cc: selectedOptions.map(option => option.value) 
    }));
  };

  const options = [
    { label: "sankalp@ycstech.in", value: "sankalp@ycstech.in" },
    { label: "kartik@ycstech.in", value: "kartik@ycstech.in" },
    { label: "design@ycstech.in", value: "design@ycstech.in" },
  ];

  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Sr no</TableHead>
            <TableHead className="text-black">Leave type</TableHead>
            <TableHead className="text-black">Leave category</TableHead>
            <TableHead className="text-black">Is sandwich</TableHead>
            <TableHead className="text-black"> Date</TableHead>
            <TableHead className="text-black">No of Days</TableHead>
            {/* <TableHead className="text-black">Reason</TableHead> */}
            <TableHead className="text-black">Status</TableHead>          
            <TableHead className="text-black">Details</TableHead>          
            <TableHead className="text-black">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((leave, index) => (
            <TableRow key={index}>
              <TableCell className="">{leave.id}</TableCell>
              <TableCell>{leave.leavetype}</TableCell>
              <TableCell>{leave.leavecategory}</TableCell>
              <TableCell className="">{leave.issandwich}</TableCell>
              <TableCell className="">{leave.daterange}</TableCell>
              <TableCell className="">{leave.noofdays}</TableCell>
              {/* <TableCell className="">{leave.reason}</TableCell> */}
              <TableCell className="">{leave.status}</TableCell>
              <TableCell className="">
              <Link to={`/leave-details/${leave.id}`} >view</Link>
              </TableCell>
     
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
                <option value="First Half" disabled={disableOptions} >First Half</option>
                <option value="Second Half" disabled={disableOptions} >Second Half</option>
                <option value="Short Leave" disabled={disableOptions} >Short Leave</option>
              </select>
            </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cc" name="cc">
              Mail CC
            </label>
            <div>
              <MultiSelect
                options={options}
                value={selected}
                onChange={handleSelectChange} 
                labelledBy="Select"
              />
            </div>
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





