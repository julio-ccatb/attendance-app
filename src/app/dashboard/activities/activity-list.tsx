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
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Activity = {
  id: string;
  name: string;
  description: string;
  date: Date | null;
  volunteers: number;
  maxVolunteers?: number;
};

type ActivityListProps = {
  activities: Activity[];
  onEditActivity: (id: string) => void;
  onViewDetails: (id: string) => void;
};

const initialActivities: Activity[] = [
  {
    id: "1",
    name: "Beach Cleanup",
    description: "Clean up the local beach",
    date: new Date(2023, 8, 15),
    volunteers: 20,
  },
  {
    id: "2",
    name: "Food Drive",
    description: "Collect food for the local food bank",
    date: new Date(2023, 8, 22),
    volunteers: 15,
  },
  {
    id: "3",
    name: "Tree Planting",
    description: "Plant trees in the community park",
    date: new Date(2023, 9, 1),
    volunteers: 25,
  },
  // Add more mock data as needed
];

export default function ActivityList({
  activities,
  onEditActivity,
  onViewDetails,
}: ActivityListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredActivities = initialActivities.filter(
    (activity) =>
      (activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase())) &&
      (!dateFilter ||
        (activity.date &&
          activity.date.toDateString() === dateFilter.toDateString())),
  );

  const pageCount = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <DatePicker
            selected={dateFilter}
            onChange={(date: Date) => setDateFilter(date)}
            placeholderText="Filter by date"
            className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Max Volunteers</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedActivities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell className="font-medium">{activity.name}</TableCell>
              <TableCell>{activity.description}</TableCell>
              <TableCell>
                {activity.date ? activity.date.toLocaleDateString() : "Not set"}
              </TableCell>
              <TableCell>{activity.maxVolunteers}</TableCell>
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
                      onClick={() => onViewDetails(activity.id)}
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onEditActivity(activity.id)}
                    >
                      Edit
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
