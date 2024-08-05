
import React, { useState } from "react";
import Footer from "../components/user/Footer";
import Header from "../components/user/Header";
import { Button } from "../components/ui/Button";
import { CirclePlus } from "lucide-react";
import Modal from "../components/user/Modal";
import FullScreenCalendar from "../components/Calender";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import { MultiSelect } from "react-multi-select-component";
import { TableDemo } from "../components/user/Table";


export default function Index() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="flex justify-end mt-4 space-x-2">
         
           <Link to='/apply-leave'>
          <Button className="bg-[#484C7F] flex items-center" >
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
      </div>
      <div className="container">
        <TableDemo/>
      </div>
      <Footer />
    </>
  );
}
