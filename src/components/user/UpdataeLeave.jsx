
import React, { useState, useEffect } from 'react';
import Header from './Header';
import FullScreenCalendar from '../Calender';
import Footer from './Footer';
import { CircleX } from 'lucide-react';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
 const baseURL = process.env.REACT_APP_API_BASE_URL;

function UpdateLeave() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disableOptions, setDisableOptions] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState([]);
  const [formData, setFormData] = useState({
    leavetype: '',
    leavecategory: '',
    cc: [],
    reason: '',
    //  daterange: '',
    user_id: '',
    issandwich: '',
    noofdays: '',
    fromdate: '',
    todate: '',  
  });
  

  const options = [
    { label: 'sankalp@ycstech.in', value: 'sankalp@ycstech.in' },
    { label: 'kartik@ycstech.in', value: 'kartik@ycstech.in' },
    { label: 'design@ycstech.in', value: 'design@ycstech.in' },
  ];

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(`${baseURL}/get-userleave/${id}`);
        const leaveData = response.data;
  
        const daterange = moment(leaveData.fromdate).format('MMMM D, YYYY') + 
                          (leaveData.fromdate === leaveData.todate 
                            ? '' 
                            : ` to ${moment(leaveData.todate).format('MMMM D, YYYY')}`);
   
  
        setFormData({
          leavetype: leaveData.leavetype,
          leavecategory: leaveData.leavecategory,
          cc: leaveData.cc,
          reason: leaveData.reason,
           daterange: daterange,
          fromdate: moment(leaveData.fromdate).format('MMMM D, YYYY'),
          todate: moment(leaveData.todate).format('MMMM D, YYYY'),
          user_id: leaveData.user_id,
          issandwich: leaveData.issandwich,
          noofdays: leaveData.noofdays,
        });
  
        const disableOptions = leaveData.noofdays > 1;
        setDisableOptions(disableOptions);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };
  
    fetchLeaveData();
  }, [id]);
  

  
  const handleCloseModal = () => {
    setShowForm(false);
  };

  const handleSelectChange = selectedOptions => {
    setSelected(selectedOptions);
    setFormData(prevFormData => ({
      ...prevFormData,
      cc: selectedOptions.map(option => option.value),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    const authToken = localStorage.getItem('token');
    const leaveData = {
      ...formData,
      user_id: userId,
    };

    try {
      await axios.post(`${baseURL}/update-leave/${id}`, leaveData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      alert('Leave request updated successfully');
      handleCloseModal();
      navigate('/user'); 
    } catch (error) {
      setError('Error updating leave request');
      console.error('Error:', error);
    }
  };

const handleSelectDate = async (start, end) => {
  const today = moment().startOf("day");
  let startDate = moment(start);
  const endDate = moment(end);

  if (
    startDate.day() === 6 ||
    startDate.day() === 0 ||
    endDate.day() === 6 ||
    endDate.day() === 0
  ) {
    alert("You cannot select weekend days");
    setError("Cannot select individual Saturdays or Sundays.");
    return;
  }

  if (startDate.isBefore(today) || endDate.isBefore(today)) {
    alert("You cannot select previous dates");
    setError("Cannot select previous dates.");
    return;
  }

  const authToken = localStorage.getItem("token");
  let isFridayLeaveApproved = false;

  try {
    const response = await axios.get(`${baseURL}/get-leaves`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    const existingLeaves = response.data.leaves;
    console.log("Existing Leaves:", existingLeaves);

    if (startDate.day() === 1) {
      const prevFriday = startDate.clone().subtract(3, "days");
      console.log("Previous Friday:", prevFriday.format("MMMM D, YYYY"));

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

  setFormData((prevFormData) => ({
    ...prevFormData,
    daterange: `${startDate.format("MMMM D, YYYY")} to ${endDate.format(
      "MMMM D, YYYY"
    )}`,
    fromdate: startDate.format("MMMM D, YYYY"),
    todate: endDate.format("MMMM D, YYYY"),
    noofdays: endDate.diff(startDate, "days") + 1,
    isFridayLeaveApproved,
  }));
  setShowForm(true);
};


const handleChange = (e) => {
  const { name, value } = e.target;
  
  if (name === "leavetype" || name === "fromdate" || name === "todate") {
    const startDate = moment(formData.fromdate, "MMMM D, YYYY");
    const endDate = moment(formData.todate, "MMMM D, YYYY");

    let isSandwich = false;
    let numOfDays = endDate.diff(startDate, "days") + 1;
    let leaveType = value;

    if (name === "leavetype") {
     
      if (leaveType === "Full Day") {
        for (
          let date = startDate.clone();
          date.isSameOrBefore(endDate);
          date.add(1, "days")
        ) {
          if (date.day() === 6 || date.day() === 0) {
            isSandwich = true;
            setDisableOptions(true);
            break;
          }
        }

        if (
          startDate.day() === 1 &&
          formData.isFridayLeaveApproved
        ) {
          isSandwich = true;
          numOfDays += 2; 
        }
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




  return (
    <>
      <Header />
      <FullScreenCalendar onSelectDate={handleSelectDate} />
      <Footer />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-4 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-black rounded-full p-2"
            >
              <CircleX />
            </button>
            <h2 className="text-xl font-bold mb-4">Update Leave</h2>

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
              </div>
              <div className="mb-4">
                <select
                  name="leavetype"
                  value={formData.leavetype}
                  onChange={handleChange}
                  disabled={disableOptions}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              </div>
              <div className="mb-4">
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={handleSelectChange}
                  labelledBy="Select"
                />
              </div>

              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="noofdays"
                  name="noofdays"
                  type="text"
                  placeholder="Number of days"
                  value={formData.noofdays}
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
                  value={formData.issandwich}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Reason"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white py-2 px-4 rounded mr-2"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateLeave;





