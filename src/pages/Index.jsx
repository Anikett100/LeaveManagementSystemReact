import React, { useState, useEffect } from "react";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import { Button } from "../components/ui/Button";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";
import { TableDemo } from "../components/user/Table";
import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default function Index() {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-user`, {
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

  // return (
  //   <>
  //     <Header />
  //     <div className="container">
  //       <div className="flex justify-end mt-4 space-x-2">
  //         <Link to='/apply-leave'>
  //           <Button className="bg-[#324983] flex items-center">
  //             <CirclePlus className="w-5 h-5 mr-2" />
  //             Apply Leave
  //           </Button>
  //         </Link>
  //         <Link to='/user-holidays'>
  //           <Button className="bg-[#BC2127] flex items-center">
  //             Holidays
  //           </Button>
  //         </Link>
  //       </div>
  //       <div className="mt-4">
  //         {user && (
  //           <div className="text-black text-xl">
  //            <h1 className='text-2xl text-[#324983] font-bold ml-3 mt-2'>  Carry Forward Leaves: {user.paidleaves}</h1>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //     <div className="container">
  //       <TableDemo />
  //     </div>
  //     <Footer />
  //   </>
  // );


  return (
    <>
      <Header className="sticky top-0 z-50 bg-white shadow-md" />
      <div className="container">
        <div className="flex justify-end mt-4 space-x-2 sticky top-[64px] z-40 bg-white py-2"> 
          <Link to="/apply-leave">
            <Button className="bg-[#324983] flex items-center">
              <CirclePlus className="w-5 h-5 mr-2" />
              Apply Leave
            </Button>
          </Link>
          <Link to="/user-holidays">
            <Button className="bg-[#BC2127] flex items-center">
              Holidays
            </Button>
          </Link>
        </div>
        <div className="mt-4">
          {user && (
            <div className="text-black text-xl">
              <h1 className="text-2xl text-[#324983] font-bold ml-3 mt-2">
                Carry Forward Leaves: {user.paidleaves}
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className="container overflow-auto h-[calc(100vh-200px)] mt-4">
        <TableDemo />
      </div>
      <Footer />
    </>
  );
  
}
