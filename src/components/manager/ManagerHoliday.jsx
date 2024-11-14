
// import React from 'react'
// import Header from './Header'
// import Footer from '../user/Footer'
// import Sidebar from './Sidebar'
// import { ManagerHolidayTable } from './ManagerHolidayTable'



// function ManagerHoliday() {
//   return (
//     <>
    
//     <div className="flex">
//     <Sidebar className='fixed'/>
//     <div className="flex flex-col flex-1">
//       <Header />
//       <div className='container'>
//       <h1 className='text-3xl text-[#484C7F] font-bold ml-3 mt-2'>Holidays and Events</h1>
//       <hr className='mt-2'></hr>
//      </div>     
//       <div className="p-4 ml-6 ">
//        <ManagerHolidayTable/>
//       </div>
//     </div>
//   </div>
//   <Footer/>
//   </>
//   )
// }

// export default ManagerHoliday



import React from 'react';
import Header from './Header';
import Footer from '../user/Footer';
import Sidebar from './Sidebar';
import { ManagerHolidayTable } from './ManagerHolidayTable';

function ManagerHoliday() {
  return (
    <>
      <div className="flex min-h-screen">
        <div className="fixed inset-y-0 left-0 w-64">
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1 ml-64">
          <Header />
          <div className="container mx-auto px-4">
            <h1 className="text-3xl text-[#324983] font-bold ml-3 mt-2">Holidays and Events</h1>
            <hr className="mt-2" />
          </div>     
          <div className="p-4">
            <ManagerHolidayTable />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ManagerHoliday;
