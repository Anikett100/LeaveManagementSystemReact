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
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const totalPages = Math.ceil(holidays.length / ITEMS_PER_PAGE);

  const currentItems = holidays.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container-fluid mb-14 ">
      <div className="relative mt-5 max-h-[400px] overflow-y-auto border border-gray-300 rounded-md">
      <Table className="mt-2 ">
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
          {currentItems.map((holiday,index) => (
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
       <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
