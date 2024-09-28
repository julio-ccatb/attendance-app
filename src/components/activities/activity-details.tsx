"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";

type ActivityDetailsProps = {
  activityId: number;
  onBack: () => void;
  onEdit: (id: number) => void;
};

export default function ActivityDetails({
  activityId,
  onBack,
  onEdit,
}: ActivityDetailsProps) {
  const {
    isLoading,
    error,
    data: activity,
  } = api.activity.getById.useQuery({ id: activityId });

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (!activity) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Activity not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Button onClick={onBack} variant="outline" className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{activity.name}</CardTitle>
          <CardDescription>{activity.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Date</h3>
              <p>{activity.dateStart.toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="font-semibold">Maximum Volunteers</h3>
              <p>{activity.maxVolunteers}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => onEdit(activity.id)}>
            <Edit className="mr-2 h-4 w-4" /> Edit Activity
          </Button>
        </CardFooter>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Registered Volunteers</CardTitle>
          <CardDescription>
            List of volunteers signed up for this activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {volunteers.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>{volunteer.name}</TableCell>
                  <TableCell>{volunteer.email}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <p>
            {/* Total Volunteers: {volunteers.length} / {activity.maxVolunteers} */}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
