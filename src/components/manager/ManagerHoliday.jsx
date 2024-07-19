
import React from 'react'
import Header from './Header'
import Footer from '../user/Footer'
import Sidebar from './Sidebar'
import { HolidayTable } from '../HolidayTable'

function ManagerHoliday() {
  return (
    <>
    
    <div className="flex">
    <Sidebar/>
    <div className="flex flex-col flex-1">
      <Header />
      <div className='container'>
      <h1 className='text-3xl font-bold ml-3 mt-2'>Holidays</h1>
      </div>
      <hr className='mt-2'></hr>
      
      <div className="p-4 ml-6 ">
       <HolidayTable/>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default ManagerHoliday