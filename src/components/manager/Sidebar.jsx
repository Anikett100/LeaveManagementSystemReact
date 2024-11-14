
import { House, Users } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [teammateOpen, setTeammateOpen] = useState(false);

  const handleTeammateToggle = () => {
    setTeammateOpen(!teammateOpen);
  };

  return (
    <div className="bg-[#324983] mt-10 ml-2 w-64 flex flex-col rounded-lg h-[580px] ">
      <div className="text-white p-4">
        <div className="px-4 text-lg font-bold">Dashboard</div>
        <nav className="flex-1 mt-4">
          <ul>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <div className="flex flex-row">
                <span className="mr-2">
                  <House />
                </span>
                <a href="/manager" className="text-white hover:text-[#F19828] font-bold">
                  Dashboard
                </a>
              </div>
            </li>
            <li className="px-4 py-2">
              <div
                className="flex flex-row cursor-pointer"
                onClick={handleTeammateToggle}
              >
                <span className="mr-2">
                  <Users />
                </span>
                <span className="hover:text-[#F19828]">Teammate</span>
              </div>
              {teammateOpen && (
                <ul className="ml-6 mt-2">
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <a href="/manager-leaverequests" className="text-white hover:text-[#F19828] font-bold">
                      Leave Request
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <a href="/manager-attendance" className="text-white hover:text-[#F19828] font-bold">
                      Attendance
                    </a>
                  </li>
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <a href="/manager-holidays" className="text-white hover:text-[#F19828] font-bold">
                      Holidays
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <a href="/" className="text-white hover:text-[#F19828] font-bold">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
