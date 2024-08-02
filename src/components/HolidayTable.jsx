import { CircleX, CircleCheckBig } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table";

const holidays = [
  {
    SrNo: "1",
    HolidayDay: "Monday",
    HolidayDate: "29 Aug 2024",
    HolidayName: "Diwali",
  },
  {
    SrNo: "2",
    HolidayDay: "Friday",
    HolidayDate: "30 Aug 2024",
    HolidayName: "Festival",
  },
  {
    SrNo: "3",
    HolidayDay: "Thursaday",
    HolidayDate: "01 Sep 2024",
    HolidayName: "Public Holiday",
  },
  {
    SrNo: "4",
    HolidayDay: "Saturday",
    HolidayDate: "05 Sep 2024",
    HolidayName: "Diwali",
  },
  {
    SrNo: "5",
    HolidayDay: "Monaday",
    HolidayDate: "10 Sep 2024",
    HolidayName: "Vacation",
  },
];

export function HolidayTable() {
  return (
    <div className="container-fluid">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Sr no</TableHead>
            <TableHead> Day</TableHead>
            <TableHead> Date</TableHead>
            <TableHead> Name</TableHead>
            <TableHead> Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holidays.map((holiday) => (
            <TableRow key={holiday.SrNo}>
              <TableCell className="font-medium">{holiday.SrNo}</TableCell>
              <TableCell>{holiday.HolidayDay}</TableCell>
              <TableCell>{holiday.HolidayDate}</TableCell>
              <TableCell>{holiday.HolidayName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
