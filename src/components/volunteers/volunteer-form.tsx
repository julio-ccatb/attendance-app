"use client";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VolunteerCreateWithoutAttendancesInputSchema,
  type Volunteer,
} from "pg/generated/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type z } from "zod";

type TInput = z.infer<typeof VolunteerCreateWithoutAttendancesInputSchema>;
const resolver = zodResolver(VolunteerCreateWithoutAttendancesInputSchema);

interface VolunteerFormProps {
  initialData?: Volunteer;
  onSubmit: () => void;
}

export default function VolunteerForm({
  initialData,
  onSubmit,
}: VolunteerFormProps) {
  const { mutate: createVolunteer, isPending: isCreatignVolunteer } =
    api.volunteer.create.useMutation({
      onSuccess: () => {
        toast({
          title: "New Volunteer added!",
          description: "Your Volunteer has been successfully added.",
        });
        return onSubmit();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong creating.",
          description: err.message,
        });
      },
    });
  const { mutate: updateVolunteer, isPending: isUpdatingVolunteer } =
    api.volunteer.update.useMutation({
      onSuccess: () => {
        toast({
          title: "Volunteer updated!",
          description: "The Volunteer details have been successfully updated.",
        });
        return onSubmit();
      },
      onError: (err) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong updating.",
          description: err.message,
        });
      },
    });

  const form = useForm<TInput>({
    resolver: initialData ? undefined : resolver,
    defaultValues: initialData ?? {
      name: "",
      uniqueId: "",
      phone: "",
      email: "",
    },
  });
  const handleChange: SubmitHandler<TInput> = (data) => {
    if (initialData) {
      updateVolunteer({ data, where: { id: initialData.id } });

      return;
    } else {
      createVolunteer(data);

      return;
    }
  };

  return (
    <Card className="m-0 mx-auto w-full max-w-2xl border-none">
      <CardHeader>
        <CardTitle>
          {initialData ? "Edit Volunteer" : "Add New Volunteer"}
        </CardTitle>
        <CardDescription>
          {initialData
            ? "Update the volunteer's information."
            : "Enter the details of the new volunteer."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChange)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    The full name of the volunteer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="uniqueId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unique ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="000-000000-0"
                      {...field}
                      autoComplete="off"
                      disabled={initialData}
                    />
                  </FormControl>
                  <FormDescription>
                    A unique identifier for the volunteer.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {`The volunteer's contact number (optional).`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="johndoe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {`The volunteer's email address (optional).`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isCreatignVolunteer || isUpdatingVolunteer}
            >
              {isCreatignVolunteer || isUpdatingVolunteer
                ? "Submitting..."
                : initialData
                  ? "Update Volunteer"
                  : "Add Volunteer"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
