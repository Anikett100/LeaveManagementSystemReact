
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
import axios from "axios";
import { useEffect, useState } from "react";
const baseURL = process.env.REACT_APP_API_BASE_URL;

export function HolidayTable() {
  const [holidays, setHolidays] = useState([]);
  const fetchHolidays = async () => {
    try {
      const response = await axios.get(`${baseURL}/get-holiday`);
      setHolidays(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  return (
    <div className="container-fluid ">
      <Table className="mt-5">
        <TableHeader>
          <TableRow>
            <TableHead className="text-black">Sr no</TableHead>
            <TableHead className="text-black"> Date</TableHead>
            <TableHead className="text-black"> Day</TableHead>
            <TableHead className="text-black"> Name</TableHead>
            <TableHead className="text-black"> Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {holidays.map((holiday,index) => (
            <TableRow   key={holiday.id}
            className={`${holiday.type === "Holiday" ? "text-red-600" : "text-green-800"}`}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{holiday.date}</TableCell> 
              <TableCell>{holiday.day}</TableCell>
              <TableCell>{holiday.name}</TableCell>
              <TableCell>{holiday.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
