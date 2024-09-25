"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ActivityFormData = {
  id?: string;
  name: string;
  description: string;
  date: Date | null;
  maxVolunteers: number;
};

type ActivityFormProps = {
  initialData?: ActivityFormData;
  onSubmit: (data: ActivityFormData) => void;
};

export default function ActivityForm({
  initialData,
  onSubmit,
}: ActivityFormProps) {
  const [formData, setFormData] = useState<ActivityFormData>(
    initialData ?? {
      name: "",
      description: "",
      date: null,
      maxVolunteers: 0,
    },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mx-auto w-full max-w-2xl border-none">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Activity" : "Add New Activity"}
        </CardTitle>
        <CardDescription>
          {initialData
            ? "Update the activity's information."
            : "Enter the details of the new activity."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Activity Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="mr-2" htmlFor="date">
              Date
            </Label>
            <DatePicker
              id="date"
              selected={formData.date}
              onChange={handleDateChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxVolunteers">Maximum Volunteers</Label>
            <Input
              id="maxVolunteers"
              name="maxVolunteers"
              type="number"
              value={formData.maxVolunteers}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update" : "Add"} Activity
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
