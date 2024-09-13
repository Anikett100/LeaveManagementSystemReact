
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Index from './pages/Index';
import PrivateRoute from './components/PrivateRoute';
import UserHolidays from './components/user/UserHolidays';
import AdminHoliday from './components/admin/AdminHoliday';
import UserLeaveDetails from './components/user/UserLeaveDetails';
import AdminLeaveDetails from './components/admin/AdminLeaveDetails';
import LeaveRequestsDetails from './components/manager/LeaveRequestsDetails';
import ApplyLeave from './components/user/ApplyLeave';
import UpdataeLeave from './components/user/UpdataeLeave';
// import AddHoliday from './components/admin/AddHoliday';
import Attendance from './components/admin/Attendance';
import ManagerHoliday from './components/manager/ManagerHoliday';
import ManagerLeaveRequests from './components/manager/ManagerLeaveRequests';
import ManagerAttendance from './components/manager/ManagerAttendance';
import ApplyManagerLeave from './components/manager/ApplyManagerLeave';
import UpdataeManagerLeave from './components/manager/UpdataeManagerLeave';
import ManagerLeavDetails from './components/manager/ManagerLeavDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route 
          path="/user" 
          element={
            <PrivateRoute allowedRoles={['user']}>
              < Index />
            </PrivateRoute>
          } 
        />
        <Route path="/user-holidays"
         element={
          <PrivateRoute allowedRoles={['user']} >
            <UserHolidays/> 
          </PrivateRoute> 
         }
         />
        <Route path="/leave-details/:id"
         element={
          <PrivateRoute allowedRoles={['user']} >
            <UserLeaveDetails/> 
          </PrivateRoute> 
         }
         />
        <Route path="/apply-leave"
         element={
          <PrivateRoute allowedRoles={['user']} >
            <ApplyLeave/> 
          </PrivateRoute> 
         }
         />
        <Route path="/update-leave/:id"
         element={
          <PrivateRoute allowedRoles={['user']} >
            <UpdataeLeave/> 
          </PrivateRoute> 
         }
         />
        <Route 
          path="/manager" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ManagerDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manager-leave" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ApplyManagerLeave />
            </PrivateRoute>
          } 
        />
         <Route path="/update-managerleave/:id"
         element={
          <PrivateRoute allowedRoles={['manager']} >
            <UpdataeManagerLeave/> 
          </PrivateRoute> 
         }
         />
        <Route 
          path="/manager-holidays" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ManagerHoliday />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manager-attendance" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ManagerAttendance/>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/manager-leaverequests" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ManagerLeaveRequests/>
            </PrivateRoute>
          } 
        />
         <Route 
          path="/manager-leavedetails/:id" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <ManagerLeavDetails/>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/leaverequests-details/:id" 
          element={
            <PrivateRoute allowedRoles={['manager']}>
              <LeaveRequestsDetails/>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin-holidays" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminHoliday />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/admin-leavedetails/:id" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminLeaveDetails/>
            </PrivateRoute>
          } 
        />
        <Route 
          path="/attendance" 
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Attendance/>
            </PrivateRoute>
          } 
        />  
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
