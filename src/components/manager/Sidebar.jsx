import { House, Users } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [teammateOpen, setTeammateOpen] = useState(false);

  const handleTeammateToggle = () => {
    setTeammateOpen(!teammateOpen);
  };

  return (
    <div className="bg-[#484C7F] mt-10 ml-5 w-64 flex flex-col rounded-lg h-[580px]">
      <div className="text-white p-4">
        <div className="px-4 text-lg font-bold">Dashboard</div>
        <nav className="flex-1 mt-4">
          <ul>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <div className="flex flex-row">
                <span className="mr-2">
                  <House />
                </span>
                <NavLink
                  to="/manager"
                  className={({ isActive }) =>
                    isActive ? "text-blue-600 font-bold" : "text-white"
                  }
                >
                  Dashboard
                </NavLink>
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
                    <NavLink
                      to="/manager-leaverequests"
                      className={({ isActive }) =>
                        isActive ? "text-blue-600 font-bold" : "text-white"
                      }
                    >
                      Leave Request
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <NavLink
                      to="/manager-attendance"
                      className={({ isActive }) =>
                        isActive ? "text-blue-600 font-bold" : "text-white"
                      }
                    >
                      Attendance
                    </NavLink>
                  </li>
                  <li className="px-4 py-2 hover:text-[#F19828]">
                    <NavLink
                      to="/manager-holidays"
                      className={({ isActive }) =>
                        isActive ? "text-blue-600 font-bold" : "text-white"
                      }
                    >
                      Holidays
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li className="px-4 py-2 hover:text-[#F19828]">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-bold" : "text-white"
                }
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

