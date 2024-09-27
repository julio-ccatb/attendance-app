"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { type Activity } from "pg/generated/zod";
import { useState } from "react";
import ActivityForm from "./activity-form";
import ActivityList from "./activity-list";
import ActivityDetails from './activity-details';
import { api } from "@/trpc/react";
import TableError from "@/components/table-error";
import TableSkeleton from "@/components/table-skeleton";

type View = "list" | "details";


export default function ActivityManagement() {
  const [view, setView] = useState<View>("list");
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(
    null,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const {
    data: activities,
    status,
    refetch,
    error
  } = api.activity.getLatest.useQuery();


  if (status === "pending") return <TableSkeleton />;
  if (status === "error")
    return (
      <TableError
        message={error.message}
        onRetry={() => refetch()}
      />
    );

  const handleAddActivity = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  const handleEditActivity = (id: number) => {
    const activityToEdit = activities.find((activity) => activity.id === id);
    if (activityToEdit) {
      setEditingActivity(activityToEdit);
      setIsModalOpen(true);
    }
  };

  const handleViewDetails = (id: number) => {
    setView("details");
    setSelectedActivityId(id);
  };

  const handleBack = () => {
    setView("list");
    setSelectedActivityId(null);
  };

  const onSubmit = () => {
    setView("list");
    setIsModalOpen(false);
    setSelectedActivityId(null);
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
              onSubmit={onSubmit}
              initialData={editingActivity ?? undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
      {view === "list" && (
        <ActivityList
          activities={activities}
          // onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onViewDetails={handleViewDetails}
        />
      )}
      {view === 'details' && selectedActivityId && (
        <ActivityDetails
          activityId={selectedActivityId}
          onBack={handleBack}
          onEdit={handleEditActivity}
        />
      )}
    </div>
  );
}
