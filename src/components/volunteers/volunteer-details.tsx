"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Edit } from "lucide-react";
import { Volunteer } from "pg/generated/zod";
import { api } from "@/trpc/react";

// type Volunteer = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   skills: string;
//   joinDate: string;
// };

type AttendanceRecord = {
  id: string;
  activityName: string;
  date: string;
  hours: number;
};

type VolunteerDetailsProps = {
  volunteerId: number;
  onBack: () => void;
  onEdit: (id: number) => void;
};

export default function VolunteerDetails({
  volunteerId,
  onBack,
  onEdit,
}: VolunteerDetailsProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);

  const { data: volunteer } = api.volunteer.getById.useQuery({
    id: volunteerId,
  });

  if (!volunteer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Volunteer Details</CardTitle>
          <CardDescription>Information about {volunteer.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Name</h3>
              <p>{volunteer.name}</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p>{volunteer.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Phone</h3>
              <p>{volunteer.phone}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => onEdit(volunteer.id)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Volunteer
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
          <CardDescription>{`Record of volunteer's participation in activities`}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Activity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volunteer.attendances.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.activity.name}</TableCell>
                  <TableCell>{record.dateTime.toLocaleDateString()}</TableCell>
                  <TableCell>{record.hoursValue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
