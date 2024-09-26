"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TimePicker } from "@/components/ui/date-time-picker/time-picker";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { add, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type Activity, ActivityCreateWithoutAttendancesInputSchema } from 'pg/generated/zod';
import { useState } from "react";
import { type TimeValue } from "react-aria";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type z } from "zod";


type ActivityFormProps = {
  initialData?: Activity;
  onSubmit: (data: z.infer<typeof ActivityCreateWithoutAttendancesInputSchema>) => void;
};


type TInput = z.infer<typeof ActivityCreateWithoutAttendancesInputSchema>;

const resolver = zodResolver(ActivityCreateWithoutAttendancesInputSchema);

export default function ActivityForm({
  initialData,
  onSubmit,
}: ActivityFormProps) {


  const [startDuration, setStartDuration] = useState<TimeValue>();
  const [endDuration, setEndDuration] = useState<TimeValue>();


  const form = useForm<TInput>({
    resolver,
    defaultValues: initialData

  });

  const handleChange: SubmitHandler<TInput> = (data) => {
    const activitie: TInput = {
      ...data,
      dateStart: startDuration
        ? add(data.dateStart, {
          hours: startDuration.hour,
          minutes: startDuration.minute,
        })
        : data.dateStart,
      dateEnd: endDuration
        ? add(data.dateStart, {
          hours: endDuration.hour,
          minutes: endDuration.minute,
        })
        : data.dateEnd,
    };
    console.log(activitie)

    onSubmit(activitie);
  };


  return (
    <Card className="mx-auto w-full max-w-2xl border-none">
      <CardHeader className="px-2">
        <CardTitle>
          {initialData ? "Edit Activity" : "Add New Activity"}
        </CardTitle>
        <CardDescription>
          {initialData
            ? "Update the activity's information."
            : "Enter the details of the new activity."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form className="" onSubmit={form.handleSubmit(handleChange)}>

          <CardContent className="px-2 space-y-4">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief or resume of the activitie." {...field} />
                    </FormControl>
                    <FormDescription>
                      Description of the activity.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxVolunteers"
                render={() => (
                  <FormItem>
                    <FormLabel>Quota</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="20 (Default)" {...form.register("maxVolunteers", { valueAsNumber: true })}
                      />
                    </FormControl>
                    <FormDescription>
                      Quota of volunteers (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-[350px]">

                <FormField
                  control={form.control}
                  name="dateStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mr-2">Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full  pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as Date}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />

                          <TimePicker
                            value={startDuration}
                            onChange={(value) => setStartDuration(value)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Start Date of the activity.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />            <FormField
                  control={form.control}
                  name="dateEnd"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mr-2">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full  pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value as Date}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date("1900-01-01")}
                            initialFocus
                          />

                          <TimePicker
                            value={startDuration}
                            onChange={(value) => setStartDuration(value)}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        End Date of the activity.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between px-2">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button
              disabled={!form.formState.isValid}
              type="submit">
              {initialData ? "Update" : "Add"} Activity
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
