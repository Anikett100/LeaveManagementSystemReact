

import { House, Users } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [teammateOpen, setTeammateOpen] = useState(false);

  const handleTeammateToggle = () => {
    setTeammateOpen(!teammateOpen);
  };

  return (
    <div className="bg-[#484C7F] mt-10 ml-5 w-64 flex flex-col rounded-lg">
      <div className="text-white p-4 h-[580px]">
        <div className="px-4 text-lg font-bold">Dashboard</div>
        <nav className="flex-1 mt-4">
          <ul>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <div className="flex flex-row">
                <span className="mr-2"><House /></span>
                <Link to="/admin">Dashboard</Link>
              </div>
            </li>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <div className="flex flex-row cursor-pointer" onClick={handleTeammateToggle}>
                <span className="">  </span>
                <span className="mr-2"><Users /></span>
                <span>Teammate</span>
              </div>
              {teammateOpen && (
                <ul className="ml-6 mt-2">
                  
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <Link to="/attendance">Attendance</Link>
                  </li>
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <Link to="/admin-holidays">Holidays</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <Link to="/">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;





