// import React from "react";
// import Sidebar from "../components/admin/sidebar";
// import Header from "../components/admin/Header";
// import Footer from "../components/user/Footer";
// import { LeaveRequestTable } from "../components/admin/LeaveRequestTable";

// export default function AdminDashboard() {
//   return (
//     <>
//       <div className="flex">
//         <Sidebar />
//         <div className="flex flex-col flex-1">
//           <Header />
//           <div className="container">
//             <h1 className="text-3xl text-[#484C7F] font-bold ml-3 mt-2 mb-1">
//               Leave Requests
//             </h1>
//             <hr></hr>
//           </div>
//           <div className="p-4">
//             <div className="container"></div>
//             <div className="container">
//               <LeaveRequestTable />
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }



import React from "react";
import Sidebar from "../components/admin/sidebar";
import Header from "../components/admin/Header";
import Footer from "../components/user/Footer";
import { LeaveRequestTable } from "../components/admin/LeaveRequestTable";

export default function AdminDashboard() {
  return (
    <>
      <div className="flex ">
        <div className="fixed top-0 left-0 h-full w-64  text-white">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ">
          <Header />
          <div className="flex-1 overflow-auto p-4 ml-64">
            {/* <div className="container">
              <h1 className="text-3xl text-[#324983] font-bold ml-3 mt-2 mb-1">
                Leave Requests
              </h1>
              <hr />
            </div> */}
            <div className="container ">
              <LeaveRequestTable />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
