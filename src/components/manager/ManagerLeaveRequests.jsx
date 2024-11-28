import React from 'react';
import { LeaveRequestTable } from './LeaveRequestTable';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from '../user/Footer';

function ManagerLeaveRequests() {
  return (
    <>
      <div className="flex min-h-screen">      
        <div className="fixed inset-y-0 left-0 w-64">
          <Sidebar />
        </div>       
        <div className="flex flex-col flex-1 ml-64">
          <Header />
          <div className="p-4">
            <LeaveRequestTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManagerLeaveRequests;
