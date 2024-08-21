import {CircleX,CircleCheckBig} from "lucide-react";

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
  
  const leaves = [
    {
      SrNo: "1",
      Name:"Aniket Navale",
      LeaveType: "half day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"2",
      Reason:"hospital",
      Action:
      <div className="flex justify-around">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
        <CircleCheckBig />
      </button>
    </div>
    },
    {
      SrNo: "2",
      Name:"Kartik Bhosale",
      LeaveType: "full day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"3",
      Reason:"hospital",
      Action:
      <div className="flex justify-around">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
        <CircleCheckBig />
      </button>
    </div>
    },
    {
      SrNo: "3",
      Name:"Sankalp khot",
      LeaveType: "full day",
      leaveCategory: "sick",
      FromDate: "29 oct 2024",
      ToDate:"30 oct 2024",
      NoOfDays:"2",
      Reason:"hospital",
      Action:
      <div className="flex justify-around">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
        <CircleCheckBig />
      </button>
    </div>
    },
    {
      SrNo: "4",
      Name:"Poonam Verma",
      LeaveType: "full day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"1",
      Reason:"hospital",
      Action:
      <div className="flex justify-around">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
        <CircleCheckBig />
      </button>
    </div>
    },
    {
      SrNo: "5",
      Name:"Sanika Laulkar",
      LeaveType: "half day",
      leaveCategory: "sick",
      FromDate: "29 sept 2024",
      ToDate:"30 sept 2024",
      NoOfDays:"1",
      Reason:"hospital",
      Action:
      <div className="flex justify-around">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
        <CircleCheckBig />
      </button>
    </div>
    },
    {
      SrNo: "6",
      Name:"Suryali Kokare",
      LeaveType: "full  day",
      leaveCategory: "sick",
      FromDate: "29 Aug 2024",
      ToDate:"30 Aug 2024",
      NoOfDays:"1",
      Reason:"hospital",
      Action:
      <div className="flex justify-around">
      <button className="bg-red-500 rounded text-white transition">
        <CircleX />
      </button>
      <button className="bg-green-500 rounded text-white transition">
        <CircleCheckBig/>
      </button>
    </div>
    },
    
  ]
  
  export function LeaveRequestTable() {
    return (
      <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Sr no</TableHead>
            <TableHead>Name</TableHead>
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
          {leaves.map((leave) => (
            <TableRow key={leave.leave}>
              <TableCell className="font-medium">{leave.SrNo}</TableCell>
              <TableCell>{leave.Name}</TableCell>
              <TableCell>{leave.LeaveType}</TableCell>
              <TableCell>{leave.leaveCategory}</TableCell>
              <TableCell className="">{leave.FromDate}</TableCell>
              <TableCell className="">{leave.ToDate}</TableCell>
              <TableCell className="">{leave.NoOfDays}</TableCell>
              <TableCell className="">{leave.Reason}</TableCell>
              <TableCell className="">{leave.Action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    )
  }
  

