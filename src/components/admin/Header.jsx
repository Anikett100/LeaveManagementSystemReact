import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
  
    const handleDropdownToggle = () => {
      setDropdownOpen(!dropdownOpen);
    };
  
    const handleOutsideClick = (event) => {
      if (!event.target.closest("#dropdownToggle")) {
        setDropdownOpen(false);
      }
    };
  
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
    }, [])

    useEffect(() => {
      if (dropdownOpen) {
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.removeEventListener("click", handleOutsideClick);
      }
    
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }, [dropdownOpen]);
  
    return (
      <nav className="bg-[#F9FBFD] p-4 h-24 w-full">
        <div className="md:container md:mx-auto flex justify-end items-center">
         
          <div className="flex items-center space-x-4">
            <div className="relative">
              <h2
                id="dropdownToggle"
                onClick={handleDropdownToggle}
                className="text-black cursor-pointer"
              >
                {user ? user.name : "Loading..."}
              </h2>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
            <img
              src="/profile.png"
              alt="Profile"
              className="rounded-full bg-slate-50 w-14"
            />
          </div>
        </div>
      </nav>
    );
  };
  export default Header;