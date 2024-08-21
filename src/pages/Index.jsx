

import React, { useState, useEffect } from "react";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import { Button } from "../components/ui/Button";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { TableDemo } from "../components/user/Table";
import axios from "axios";

export default function Index() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="flex justify-end mt-4 space-x-2">
          <Link to='/apply-leave'>
            <Button className="bg-[#484C7F] flex items-center">
              <CirclePlus className="w-5 h-5 mr-2" />
              Apply Leave
            </Button>
          </Link>
          <Link to='/user-holidays'>
            <Button className="bg-[#FF6347] flex items-center">
              Holidays
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          {user && (
            <div className="text-black">
             Carry Forward Leaves: {user.paidleaves}
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <TableDemo />
      </div>
      <Footer />
    </>
  );
}



// import React, { useState, useEffect } from "react";
// import Footer from "../components/user/Footer";
// import Header from "../components/user/Header";
// import { Button } from "../components/ui/Button";
// import { CirclePlus } from "lucide-react";
// import { Link } from "react-router-dom";
// import { TableDemo } from "../components/user/Table";
// import axios from "axios";

// export default function Index() {
//   const [user, setUser] = useState(null);
//   const [leavesCount, setLeavesCount] = useState(0);

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/get-user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`
//         }
//       });
//       setUser(response.data);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     if (user) {
//       let start = 0;
//       const end = parseInt(user.paidleaves) || 0;
//       if (start === end) return;
      
//       let incrementTime = (2 / end) * 1000; 
      
//       let timer = setInterval(() => {
//         start += 1;
//         setLeavesCount(start);
//         if (start === end) clearInterval(timer);
//       }, incrementTime);
//     }
//   }, [user]);

//   return (
//     <>
//       <Header/>
//       <div className="container mt-4">
//         <div className="flex justify-center">
//           <div className=" bg-white shadow-md rounded-lg p-2  max-w-xs">
//             <h2 className="text-lg font-semibold text-gray-700 mb-2">Carry Forward Leaves</h2>
//             <div className="text-4xl font-bold text-[#484C7F]">
//               {leavesCount}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container mt-4">
//         <div className="flex justify-end space-x-2">
//           <Link to='/apply-leave'>
//             <Button className="bg-[#484C7F] flex items-center">
//               <CirclePlus className="w-5 h-5 mr-2" />
//               Apply Leave
//             </Button>
//           </Link>
//           <Link to='/user-holidays'>
//             <Button className="bg-[#FF6347] flex items-center">
//               Holidays
//             </Button>
//           </Link>
//         </div>
//         <TableDemo />
//       </div>
//       <Footer />
//     </>
//   );
// }
