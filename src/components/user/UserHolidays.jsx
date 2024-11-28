import React from 'react'
import Header from './Header'
import { HolidayTable } from '../HolidayTable'
import Footer from './Footer'

function UserHolidays() {
  return (
    <>
    <Header/>
    <div className='container mt-20'>
     <div className='mb-6'>
     <h1 className='text-3xl text-[#324983] font-bold ml-3 mt-2'>Holidays and Events</h1>
     <hr/>
     </div> 
    <HolidayTable/>
    </div>
    <Footer/>
    </>
  )
}

export default UserHolidays   