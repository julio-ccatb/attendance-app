"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

type Volunteer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
};

const initialVolunteers: Volunteer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "555-123-4567",
    joinDate: "2023-03-10",
  },
  // Add more mock data as needed
];

export default function VolunteerList() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(initialVolunteers);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredVolunteers = volunteers.filter(
    (volunteer) =>
      volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pageCount = Math.ceil(filteredVolunteers.length / itemsPerPage);
  const paginatedVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleDelete = (id: string) => {
    setVolunteers(volunteers.filter((v) => v.id !== id));
  };

  const isDesktop = useMediaQuery("(min-width: 840px)", {
    initializeWithValue: false,
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Volunteer Management</h1>
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search volunteers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>
          <Plus className={`${isDesktop ? "mr-2" : ""} h-4 w-4`} />
          {!isDesktop || "Add Volunteer"}
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedVolunteers.map((volunteer) => (
            <TableRow key={volunteer.id}>
              <TableCell className="font-medium">{volunteer.name}</TableCell>
              <TableCell>{volunteer.email}</TableCell>
              <TableCell>{volunteer.phone}</TableCell>
              <TableCell>{volunteer.joinDate}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => console.log("View details", volunteer.id)}
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => console.log("Edit", volunteer.id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(volunteer.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
