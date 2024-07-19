import {CircleX,CircleCheckBig, FilePenLine} from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/Table"
  
  const invoices = [
    {
      SrNo: "1",
      LeaveType: "half day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"2",
      Reason:"hospital",
      Action:
      <div className="flex justify-between">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
      <FilePenLine />
      </button>
    </div>
    },
    {
      SrNo: "2",
      LeaveType: "full day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"3",
      Reason:"hospital",
      Action:
      <div className="flex justify-between">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
      <FilePenLine />
      </button>
    </div>
    },
    {
      SrNo: "3",
      LeaveType: "full day",
      leaveCategory: "sick",
      FromDate: "29 oct 2024",
      ToDate:"30 oct 2024",
      NoOfDays:"2",
      Reason:"hospital",
      Action:
      <div className="flex justify-between">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
      <FilePenLine />
      </button>
    </div>
    },
    {
      SrNo: "4",
      LeaveType: "full day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"1",
      Reason:"hospital",
      Action:
      <div className="flex justify-between">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
      <FilePenLine />
      </button>
    </div>
    },
    {
      SrNo: "5",
      LeaveType: "half day",
      leaveCategory: "sick",
      FromDate: "29 sept 2024",
      ToDate:"30 sept 2024",
      NoOfDays:"1",
      Reason:"hospital",
      Action:
      <div className="flex justify-between">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
      <FilePenLine />
      </button>
    </div>
    },
    {
      SrNo: "6",
      LeaveType: "full  day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"1",
      Reason:"hospital",
      Action:
      <div className="flex justify-between">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
      <FilePenLine />
      </button>
    </div>
    },
    
  ]
  
  export function ManagerLeaveTable() {
    return (
      <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[]">Sr no</TableHead>
            <TableHead>Leave type</TableHead>
            <TableHead>leave category</TableHead>
            <TableHead className="">From date</TableHead>
            <TableHead className="">To date</TableHead>   
            <TableHead className="">No of Days</TableHead>
            <TableHead className="">Reason</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium">{invoice.SrNo}</TableCell>
              <TableCell>{invoice.LeaveType}</TableCell>
              <TableCell>{invoice.leaveCategory}</TableCell>
              <TableCell className="">{invoice.FromDate}</TableCell>
              <TableCell className="">{invoice.ToDate}</TableCell>
              <TableCell className="">{invoice.NoOfDays}</TableCell>
              <TableCell className="">{invoice.Reason}</TableCell>
              <TableCell className="">{invoice.Action}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  

// import { CircleX, CircleCheckBig } from "lucide-react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table";

// const invoices = [
//   {
//     SrNo: "1",
//     LeaveType: "half day",
//     leaveCategory: "sick",
//     FromDate: "29 Aug 2024",
//     ToDate: "30 Aug 2024",
//     NoOfDays: "2",
//     Reason: "hospital",
//     Action: (
//       <div className="flex justify-around">
//         <button className="bg-red-500 rounded text-white p-2 transition hover:bg-red-600">
//           <CircleX />
//         </button>
//         <button className="bg-green-500 rounded text-white p-2 transition hover:bg-green-600">
//           <CircleCheckBig />
//         </button>
//       </div>
//     ),
//   },
//   {
//     SrNo: "2",
//     LeaveType: "full day",
//     leaveCategory: "sick",
//     FromDate: "29 Aug 2024",
//     ToDate: "30 Aug 2024",
//     NoOfDays: "2",
//     Reason: "hospital",
//     Action: (
//       <div className="flex justify-around">
//         <button className="bg-red-500 rounded text-white p-2 transition hover:bg-red-600">
//           <CircleX />
//         </button>
//         <button className="bg-green-500 rounded text-white p-2 transition hover:bg-green-600">
//           <CircleCheckBig />
//         </button>
//       </div>
//     ),
//   },
//   {
//     SrNo: "3",
//     LeaveType: "full day",
//     leaveCategory: "sick",
//     FromDate: "29 Oct 2024",
//     ToDate: "30 Oct 2024",
//     NoOfDays: "2",
//     Reason: "hospital",
//     Action: (
//       <div className="flex justify-around">
//         <button className="bg-red-500 rounded text-white p-2 transition hover:bg-red-600">
//           <CircleX />
//         </button>
//         <button className="bg-green-500 rounded text-white p-2 transition hover:bg-green-600">
//           <CircleCheckBig />
//         </button>
//       </div>
//     ),
//   },
//   {
//     SrNo: "4",
//     LeaveType: "full day",
//     leaveCategory: "sick",
//     FromDate: "29 Aug 2024",
//     ToDate: "30 Aug 2024",
//     NoOfDays: "2",
//     Reason: "hospital",
//     Action: (
//       <div className="flex justify-around">
//         <button className="bg-red-500 rounded text-white p-2 transition hover:bg-red-600">
//           <CircleX />
//         </button>
//         <button className="bg-green-500 rounded text-white p-2 transition hover:bg-green-600">
//           <CircleCheckBig />
//         </button>
//       </div>
//     ),
//   },
//   {
//     SrNo: "5",
//     LeaveType: "half day",
//     leaveCategory: "sick",
//     FromDate: "29 Sept 2024",
//     ToDate: "30 Sept 2024",
//     NoOfDays: "2",
//     Reason: "hospital",
//     Action: (
//       <div className="flex justify-around">
//         <button className="bg-red-500 rounded text-white p-2 transition hover:bg-red-600">
//           <CircleX />
//         </button>
//         <button className="bg-green-500 rounded text-white p-2 transition hover:bg-green-600">
//           <CircleCheckBig />
//         </button>
//       </div>
//     ),
//   },
//   {
//     SrNo: "6",
//     LeaveType: "full day",
//     leaveCategory: "sick",
//     FromDate: "29 Aug 2024",
//     ToDate: "30 Aug 2024",
//     NoOfDays: "2",
//     Reason: "hospital",
//     Action: (
//       <div className="flex justify-around">
//         <button className="bg-red-500 rounded text-white p-2 transition hover:bg-red-600">
//           <CircleX />
//         </button>
//         <button className="bg-green-500 rounded text-white p-2 transition hover:bg-green-600">
//           <CircleCheckBig />
//         </button>
//       </div>
//     ),
//   },
// ];

// export function TableDemo() {
//   return (
//     <div className="container mx-auto mt-5">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[200px]">Sr no</TableHead>
//               <TableHead>Leave type</TableHead>
//               <TableHead>leave category</TableHead>
//               <TableHead className="">From date</TableHead>
//               <TableHead className="">To date</TableHead>
//               <TableHead className="">No of Days</TableHead>
//               <TableHead className="">Reason</TableHead>
//               <TableHead className="">Action</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {invoices.map((invoice, index) => (
//               <TableRow key={index}>
//                 <TableCell className="font-medium">{invoice.SrNo}</TableCell>
//                 <TableCell>{invoice.LeaveType}</TableCell>
//                 <TableCell>{invoice.leaveCategory}</TableCell>
//                 <TableCell className="">{invoice.FromDate}</TableCell>
//                 <TableCell className="">{invoice.ToDate}</TableCell>
//                 <TableCell className="">{invoice.NoOfDays}</TableCell>
//                 <TableCell className="">{invoice.Reason}</TableCell>
//                 <TableCell className="">{invoice.Action}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
