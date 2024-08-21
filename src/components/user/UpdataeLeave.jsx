

import React, { useState, useEffect } from 'react';
import Header from './Header';
import FullScreenCalendar from '../Calender';
import Footer from './Footer';
import { CircleX } from 'lucide-react';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

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
    daterange: '',
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
        const response = await axios.get(`http://127.0.0.1:8000/api/get-userleave/${id}`);
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
          fromdate: leaveData.fromdate,
          todate: leaveData.todate,
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
  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      await axios.post(`http://127.0.0.1:8000/api/update-leave/${id}`, leaveData, {
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


  const handleSelectDate = (start, end) => {
    const today = moment().startOf('day');
    const startDate = moment(start);
    const endDate = moment(end);
  
    if (startDate.day() === 6 || startDate.day() === 0 || endDate.day() === 6 || endDate.day() === 0) {
      alert('You cannot select weekend days');
      setError('Cannot select individual Saturdays or Sundays.');
      return;
    }
  
    if (startDate.isBefore(today) || endDate.isBefore(today)) {
      alert('You cannot select previous dates');
      setError('Cannot select previous dates.');
      return;
    }
  
    const daterange = startDate.format('MMMM D, YYYY') + 
                      (startDate.isSame(endDate) ? '' : ` to ${endDate.format('MMMM D, YYYY')}`);
    const noofdays = endDate.diff(startDate, 'days') + 1;
  
    let isSandwich = false;
    for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, 'days')) {
      if (date.day() === 6 || date.day() === 0) {
        isSandwich = true;
        break;
      }
    }
  
    const newLeaveType = noofdays > 1 ? 'Full Day' : formData.leavetype;
    const disableOptions = noofdays > 1;
  
    setFormData(prevFormData => ({
      ...prevFormData,
      daterange: daterange,
      fromdate: startDate.format('MMMM D, YYYY'),
      todate: endDate.format('MMMM D, YYYY'),
      noofdays,
      issandwich: isSandwich ? 'Yes' : 'No',
      leavetype: newLeaveType,
    }));
    setShowForm(true);
    setDisableOptions(disableOptions);
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





