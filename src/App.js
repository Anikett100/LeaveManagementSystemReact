
 import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Login from "./pages/Login";
import Index from './pages/Index';
import ManagerHoliday from './components/manager/ManagerHoliday'
import ManagerLeaveRequests from './components/manager/ManagerLeaveRequests';
import ManagerDashboard from './pages/ManagerDashboard';
import UserHolidays from './components/user/UserHolidays';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/user" element={<Index />}/>
      <Route path="/manager" element={<ManagerDashboard/>}/>
      <Route path="/manager-holidays" element={<ManagerHoliday/>}/>
      <Route path="/manager-leaverequests" element={<ManagerLeaveRequests/>}/>
      <Route path="/user-holidays" element={<UserHolidays />}/>
    </Routes>
  </BrowserRouter>
    
  );
}

export default App;
