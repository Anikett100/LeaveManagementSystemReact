import React from 'react'
import { LeaveRequestTable } from './LeaveRequestTable'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from '../user/Footer'

function ManagerLeaveRequests() {
  return (
    <>
    <div className="flex">
    <Sidebar/>
    <div className="flex flex-col flex-1">
      <Header/>
      <div className='container'>
      <h1 className='text-3xl font-bold ml-3 mt-2 mb-1 text-[#484C7F]'>Leave Requests</h1>
      </div>
      <hr></hr>
      <div className="p-4">
       <LeaveRequestTable/>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default ManagerLeaveRequests