
// import React from "react";
// import Header from "./Header";
// import Footer from "../user/Footer";
// import AttendanceTable from "./AttendanceTable"; 
// import Sidebar from "./Sidebar";

// function ManagerAttendance() {
//   return (
//     <>
//       <div className="flex">
//         <Sidebar/>
//         <div className="flex flex-col flex-1">
//           <Header/>
//           <div className="">
//           <AttendanceTable /> 
//           </div>        
//         </div>
//       </div>
//       <Footer/>
//     </>
//   );
// }

// export default ManagerAttendance;

import React from "react";
import Header from "./Header";
import Footer from "../user/Footer";
import AttendanceTable from "./AttendanceTable"; 
import Sidebar from "./Sidebar";

function ManagerAttendance() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="fixed inset-y-0 left-0 w-64">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ml-64">
          <Header />
          <div className="p-4">
            <AttendanceTable /> 
          </div>        
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManagerAttendance;
