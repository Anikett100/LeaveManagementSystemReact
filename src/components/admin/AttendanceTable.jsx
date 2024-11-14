
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_BASE_URL;

function AttendanceTable() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchAttendanceData(selectedMonth);
  }, [selectedMonth]);

  const fetchAttendanceData = (month) => {
    axios.get(`${baseURL}/attendance?month=${month}`)
      .then(response => {
        setAttendanceData(Object.values(response.data)); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const daysInMonth = new Date(currentYear, selectedMonth, 0).getDate();
  const today = currentDate.getDate();

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between mt-4 mb-4">  
       
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <XCircle size={16} color="#dc3545" className="mr-2"/> Full Day Leave
          </div>
          <div className="flex items-center">
            <Clock size={16} color="#17a2b8" className="mr-2"/> First Half
          </div>
          <div className="flex items-center">
            <Clock size={16} color="#17a2b8" className="mr-2"/> Second Half
          </div>
          <div className="flex items-center">
            <Clock size={16} color="#ffc107" className="mr-2"/> Short Leave
          </div>
          <div className="flex items-center">
            <CheckCircle size={16} color="#28a745" className="mr-2"/> Present
          </div>
        </div>
        
          <div className="flex justify-end">
          <select
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border px-2 py-1 rounded bg-[#324983] text-white"
          >
            {Array.from({ length: currentMonth }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">Name</th>
            {Array.from({ length: daysInMonth }, (_, i) => (
              <th scope="col" key={i} className="py-3 px-2">{i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((employeeData, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className=" text-black py-4 px-6">{employeeData.employee_name}</td>
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                if (day > today && selectedMonth === currentMonth) {
                  return <td key={i} className="py-4 px-2"></td>; 
                }
                
                const leaveDay = employeeData.leaves.find(leave => 
                  day >= new Date(leave.fromdate).getDate() && 
                  day <= new Date(leave.todate).getDate() &&
                  new Date(leave.fromdate).getMonth() + 1 === selectedMonth &&
                  new Date(leave.todate).getMonth() + 1 === selectedMonth
                );

                return (
                  <td key={i} className="py-4 px-2">
                    {leaveDay ? (
                      leaveDay.leavetype === 'Full Day' && leaveDay.status === 'Approved' ? (
                        <XCircle size={16} color="#dc3545"/>
                      ) : leaveDay.leavetype === 'First Half' && leaveDay.status === 'Approved' ? (
                        <Clock size={16} color="#17a2b8"/> 
                      ) : leaveDay.leavetype === 'Second Half' && leaveDay.status === 'Approved' ? (
                        <Clock size={16} color="#17a2b8"/> 
                      ) : leaveDay.leavetype === 'Short Leave' && leaveDay.status === 'Approved' ? (
                        <Clock size={16} color="#ffc107"/> 
                      ) : (
                        <CheckCircle size={16} color="#28a745"/>
                      )
                    ) : (
                      <CheckCircle size={16} color="#28a745"/>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AttendanceTable;
