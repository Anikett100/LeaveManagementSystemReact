
import React from "react";
import Sidebar from "./sidebar";
import Header from "./Header";
import Footer from "../user/Footer";
import AttendanceTable from "./AttendanceTable"; 

function Attendance() {
  return (
    <>
      <div className="flex">
        <Sidebar/>
        <div className="flex flex-col flex-1">
          <Header/>
          <div className="">
          <AttendanceTable /> 
          </div>         
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Attendance;