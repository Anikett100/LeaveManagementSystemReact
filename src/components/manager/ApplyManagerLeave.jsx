import React, { useState } from "react";
import Header from "./Header";
import FullScreenCalendar from "../Calender";
import { CircleX } from "lucide-react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Footer from "../user/Footer";
import Swal from "sweetalert2";
const baseURL = process.env.REACT_APP_API_BASE_URL;

const ApplyManagerLeave = () => {
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState([]);
  const [disableOptions, setDisableOptions] = useState(false);

  const [formData, setFormData] = useState({
    leavetype: "",
    leavecategory: "",
    reason: "",
    daterange: "",
    issandwich: "",
    noofdays: "",
    user_id: "",
  });

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowForm(false);
    setFormData({
      leavetype: "",
      leavecategory: "",
      reason: "",
      daterange: "",
      noofdays: "",
      issandwich: "",
      user_id: "",  
    });
  };

const handleSelectDate = async (start, end) => {
  const today = moment().startOf("day");
  let startDate = moment(start);
  const endDate = moment(end);
  let leaveType = "Full Day";
  let containsWeekend = false;

  for (
    let date = startDate.clone();
    date.isSameOrBefore(endDate);
    date.add(1, "days")
  ) {
    if (date.day() === 6 || date.day() === 0) {
      containsWeekend = true;
      break;
    }
  }

  if (startDate.isBefore(today) || endDate.isBefore(today)) {
    Swal.fire({
      position: "top-center",
      icon: "warning",
      title: "You cannot select previous dates",
      showConfirmButton: false,
      timer: 1600,
    });
    setError("Cannot select previous dates.");
    return;
  }

  const authToken = localStorage.getItem("token");
  let isFridayLeaveApproved = false;

  try {
    const response = await axios.get(`${baseURL}/get-sandwichleave`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const existingLeaves = response.data.leaves;

    if (startDate.day() === 1) {
      const prevFriday = startDate.clone().subtract(3, "days");

      const fridayLeave = existingLeaves.find(
        (leave) =>
          moment(leave.todate).isSame(prevFriday, "day") &&
          leave.status === "Approved" &&
          leave.leavetype === "Full Day"
      );

      if (fridayLeave) {
        isFridayLeaveApproved = true;
      }
    }
  } catch (error) {
    console.error("Error fetching user leaves:", error);
  }

  let numOfDays = endDate.diff(startDate, "days") + 1;
  if (containsWeekend || isFridayLeaveApproved) {
    Swal.fire({
      title: "Sandwich Leave Detected",
      text: "The leave period contains a weekend or an approved Friday leave. Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, continue",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        leaveType = "Full Day";
        setDisableOptions(true);

        if (isFridayLeaveApproved) {
          numOfDays += 2;
        }

        setFormData((prevFormData) => ({
          ...prevFormData,
          daterange: `${startDate.format("MMMM D, YYYY")} to ${endDate.format(
            "MMMM D, YYYY"
          )}`,
          fromdate: startDate.format("MMMM D, YYYY"),
          todate: endDate.format("MMMM D, YYYY"),
          noofdays: numOfDays,
          leavetype: leaveType,
          issandwich: containsWeekend || isFridayLeaveApproved ? "Yes" : "No",
          isFridayLeaveApproved,
        }));

        setShowForm(true);
      } else {
        
        setError("Leave request cancelled due to sandwich leave.");
      }
    });
  } else {
   
    setFormData((prevFormData) => ({
      ...prevFormData,
      daterange: `${startDate.format("MMMM D, YYYY")} to ${endDate.format(
        "MMMM D, YYYY"
      )}`,
      fromdate: startDate.format("MMMM D, YYYY"),
      todate: endDate.format("MMMM D, YYYY"),
      noofdays: numOfDays,
      leavetype: leaveType,
      issandwich: "No",
    }));

    setShowForm(true);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() !== "") {
      setError((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
    
    if (name === "leavetype" || name === "fromdate" || name === "todate") {
        const startDate = moment(formData.fromdate, "MMMM D, YYYY");
        const endDate = moment(formData.todate, "MMMM D, YYYY");
    
        let isSandwich = false;
        let numOfDays = endDate.diff(startDate, "days") + 1;
        let leaveType = value;

        if (name === "fromdate" || name === "todate") {
            for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "days")) {
                if (date.day() === 6 || date.day() === 0) { 
                    isSandwich = true;
                    leaveType = "Full Day"; 
                    setDisableOptions(true); 
                    break;
                }
            }
        }
        if (name === "leavetype" && leaveType === "Full Day") {
            for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, "days")) {
                if (date.day() === 6 || date.day() === 0) {
                    isSandwich = true;
                    setDisableOptions(true);
                    break;
                }
            }

            if (startDate.day() === 1 && formData.isFridayLeaveApproved) {
                isSandwich = true;
                numOfDays += 2; 
            }
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            leavetype: leaveType,
            issandwich: isSandwich ? "Yes" : "No",
            noofdays: numOfDays,
        }));
    } else {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
};
  
  const handleSelectChange = (selectedOptions) => {
    setSelected(selectedOptions);
    setFormData((prevFormData) => ({
      ...prevFormData,
    
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    let formErrors = {};
    if (!formData.daterange) formErrors.daterange = "* Date Range is required";
    if (!formData.leavecategory) formErrors.leavecategory = "* Leave Category is required";
    if (!formData.leavetype) formErrors.leavetype = "* Leave Type is required";
    if (!formData.reason) formErrors.reason = "* Reason is required";
  
    setError(formErrors);
    if (Object.keys(formErrors).length === 0) {
       
  
    const leaveData = {
      ...formData,
      user_id: userId,
      fromdate: formData.fromdate,
      todate: formData.todate,
    };
  
    const previousFormData = { ...formData };
    setFormData({
      ...formData,
      leavetype: "",
      leavecategory: "",
      reason: "",
      daterange: "",
      noofdays: "",
      issandwich: "",
      user_id: "",
    });
  
    try {
      const response = await axios.post(`${baseURL}/add-managerleave`, leaveData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (response.status === 200) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Leave request sent successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/manager");
      } else {
        setError("Error submitting leave request");
        setFormData(previousFormData);
      }
    } catch (error) {
      setError("Error submitting leave request");
      console.error("Error:", error);
      setFormData(previousFormData);
    }
  }
}
  


  const options = [
    { label: "sankalp@ycstech.in", value: "sankalp@ycstech.in" },   
  ];

  return (
    <>
      <Header />
      <FullScreenCalendar onSelectDate={handleSelectDate} />
      <Footer/>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-black rounded-full p-2"
            >
              <CircleX />
            </button>
            <h2 className="text-xl font-bold mb-4">Apply Leave</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="daterange"
                  value={formData.daterange}
                  placeholder="Date Range"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  readOnly
                />
              </div>
              <div className="mb-4">
                <select
                  name="leavecategory"
                  value={formData.leavecategory}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled>
                    Select Leave category
                  </option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                </select>
                {error.leavecategory && <span className="text-red-500">{error.leavecategory}</span>}
              </div>
              <div className="mb-4">
                <select
                  name="leavetype"
                  value={formData.leavetype}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={disableOptions}
                >
                  <option value="" disabled>
                    Select Leave Type
                  </option>
                  <option value="Full Day">Full Day</option>
                  <option value="First Half" disabled={disableOptions}>
                    First Half
                  </option>
                  <option value="Second Half" disabled={disableOptions}>
                    Second Half
                  </option>
                  <option value="Short Leave" disabled={disableOptions}>
                    Short Leave
                  </option>
                </select>
                {error.leavetype && <span className="text-red-500">{error.leavetype}</span>}
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="noofdays"
                  name="noofdays"
                  type="text"
                  placeholder="Number of days"
                  value={`No of Days: ${formData.noofdays}`}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="issandwich"
                  name="issandwich"
                  type="text"
                  placeholder="Sandwich Leave?"
                  value={
                    formData.issandwich === "Yes"
                      ? "Sandwich Leave"
                      : "No Sandwich Leave"
                  }
                  readOnly
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Please add your reason"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                 {error.reason && <span className="text-red-500">{error.reason}</span>}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyManagerLeave;




