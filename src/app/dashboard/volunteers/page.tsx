"use client";

import TableError from "@/components/table-error";
import TableSkeleton from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import VolunteerDetails from "@/components/volunteers/volunteer-details";
import VolunteerForm from "@/components/volunteers/volunteer-form";
import VolunteerList from "@/components/volunteers/volunteer-list";
import { api } from "@/trpc/react";
import { Plus } from "lucide-react";
import { type Volunteer } from "pg/generated/zod";
import { useState } from "react";

type View = "list" | "details";

export default function VolunteerManagement() {
  const [view, setView] = useState<View>("list");
  const [selectedVolunteerId, setSelectedVolunteerId] = useState<number | null>(
    null,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(
    null,
  );

  const {
    data: volunteers,
    status,
    refetch,
    error,
  } = api.volunteer.getLatest.useQuery();

  if (status === "pending") return <TableSkeleton />;
  if (status === "error")
    return <TableError message={error.message} onRetry={() => refetch()} />;

  const handleAddVolunteer = () => {
    setEditingVolunteer(null);
    setIsModalOpen(true);
  };

  const handleEditVolunteer = (id: number) => {
    const volunteerToEdit = volunteers.find((volunteer) => volunteer.id === id);
    if (volunteerToEdit) {
      setEditingVolunteer(volunteerToEdit);
      setIsModalOpen(true);
    }
  };

  const handleViewDetails = (id: number) => {
    setView("details");
    setSelectedVolunteerId(id);
  };

  const handleBack = () => {
    setView("list");
    setSelectedVolunteerId(null);
  };

  const onSubmit = () => {
    setView("list");
    setIsModalOpen(false);
    setSelectedVolunteerId(null);
    void refetch();
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="mb-5 text-2xl font-bold">Volunteer Management</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddVolunteer}>
              <Plus className="mr-2 h-4 w-4" /> Add Volunteer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <VolunteerForm
              onSubmit={onSubmit}
              initialData={editingVolunteer ?? undefined}
            />
          </DialogContent>
        </Dialog>
      </div>
      {view === "list" && (
        <VolunteerList
          volunteers={volunteers}
          onEditVolunteer={handleEditVolunteer}
          onViewDetails={handleViewDetails}
        />
      )}
      {view === "details" && selectedVolunteerId && (
        <VolunteerDetails
          volunteerId={selectedVolunteerId}
          onBack={handleBack}
          onEdit={handleEditVolunteer}
        />
      )}
    </div>
  );
}
