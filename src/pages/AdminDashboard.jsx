import React from 'react'
import Sidebar from '../components/admin/sidebar'
import Header from '../components/admin/Header'
import Footer from '../components/user/Footer'
import { LeaveRequestTable } from '../components/admin/LeaveRequestTable'

export default function AdminDashboard() {
  return (
    <>
    <div className="flex">
    <Sidebar/>
    <div className="flex flex-col flex-1">
      <Header/>
      <div className='container'>
      <h1 className='text-3xl font-bold ml-3 mt-2 mb-1'>Leave Requests</h1>
      </div>
      <hr></hr>
      <div className="p-4">
      <div className="container">
      </div>
      <div className="container">
        <LeaveRequestTable/>
      </div>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}
