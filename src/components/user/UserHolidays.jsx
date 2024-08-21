import React from 'react'
import Header from './Header'
import { HolidayTable } from '../HolidayTable'
import Footer from './Footer'

function UserHolidays() {
  return (
    <>
    <Header/>
    <div className='container mt-28'>
    <HolidayTable/>
    </div>
    <Footer/>
    </>
  )
}

export default UserHolidays   