"use client";

import { useState } from "react";
import ActivityList from "./activity-list";
import ActivityForm from "./activity-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type View = "list" | "details";

type Activity = {
  id: string;
  name: string;
  description: string;
  date: Date | null;
  volunteer: number;
  maxVolunteers: number;
};

export default function ActivityManagement() {
  const [view, setView] = useState<View>("list");
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const handleEditActivity = (id: string) => {
    const activityToEdit = activities.find((activity) => activity.id === id);
    if (activityToEdit) {
      setEditingActivity(activityToEdit);
      setIsModalOpen(true);
    }
  };

  const handleViewDetails = (id: string) => {
    setView("details");
    setSelectedActivityId(id);
  };

  const handleBack = () => {
    setView("list");
    setSelectedActivityId(null);
  };

  const handleSubmit = (data: Activity) => {
    if (editingActivity) {
      setActivities(
        activities.map((activity) =>
          activity.id === editingActivity.id
            ? { ...data, id: activity.id }
            : activity,
        ),
      );
    } else {
      setActivities([...activities, { ...data, id: Date.now().toString() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activity Management</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddActivity}>
              <Plus className="mr-2 h-4 w-4" /> Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ActivityForm
              initialData={editingActivity ?? undefined}
              onSubmit={() => handleSubmit}
            />
          </DialogContent>
        </Dialog>
      </div>
      {view === "list" && (
        <ActivityList
          activities={activities}
          onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onViewDetails={handleViewDetails}
        />
      )}
      {/* {view === 'details' && selectedActivityId && (
        <ActivityDetails
          activityId={selectedActivityId}
          onBack={handleBack}
          onEdit={handleEditActivity}
        />
      )} */}
    </div>
  );
}
