"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  AArrowDown,
  AArrowUp,
  CheckIcon,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { type Volunteer } from "pg/generated/zod";
import { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { isAfter, isBefore, parseISO } from "date-fns";
import { useMediaQuery } from "usehooks-ts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type VolunteerListProps = {
  volunteers: Volunteer[];
  onEditVolunteer: (id: number) => void;
  onViewDetails: (id: number) => void;
};

const _: { value: keyof Volunteer; label: string }[] = [
  { value: "email", label: "Email" },
  { value: "name", label: "Name" },
  { value: "uniqueId", label: "ID" },
  { value: "phone", label: "Phone" },
];

const options = _.sort((a, b) => a.label.localeCompare(b.label));

export default function VolunteerList({
  volunteers,
  onEditVolunteer,
  onViewDetails,
}: VolunteerListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [dateStartFilter, setDateStartFilter] = useState<Date | null>(null);
  const [dateEndFilter, setDateEndFilter] = useState<Date | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("name");

  const columns = useMemo<ColumnDef<Volunteer>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: (info) => (
          <span className="font-medium">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "createdAt",
        header: "Join Date",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue() as string).toLocaleDateString()
            : "Not set",
      },
      {
        accessorKey: "uniqueId",
        header: "ID",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails(row.original.id)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // console.log(row.original.id)
                  onEditVolunteer(row.original.id);
                }}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEditVolunteer, onViewDetails],
  );
  const filteredData = volunteers?.filter((item) => {
    const itemDate = parseISO(item.createdAt.toISOString());

    // Check if the item's date is within the selected date range
    return (
      (!dateStartFilter || !isBefore(itemDate, dateStartFilter)) &&
      (!dateEndFilter || !isAfter(itemDate, dateEndFilter))
    );
  });

  const table = useReactTable({
    columns,
    data: filteredData ?? [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex: false, //  <-- stops the rerendering
    autoResetAll: false, //  <-- stops the rerendering
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      columnFilters: [{ id: value, value: searchTerm }],
      sorting,
      pagination,
    },
  });
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          <Input
            placeholder="Search volunteers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Popover open={open} onOpenChange={(value) => setOpen(value)}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? options.find((option) => option.value === value)?.label
                  : "Select Option..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search for..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No filter found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {option.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === option.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className={`${isDesktop ? "" : ""} flex gap-2`}>
            <DatePicker
              selected={dateStartFilter}
              onChange={(date) => setDateStartFilter(date)}
              placeholderText={isDesktop ? "Filter by date start" : "Start"}
              className={`${isDesktop ? "" : "w-16"} rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
            <DatePicker
              selected={dateEndFilter}
              onChange={(date) => setDateEndFilter(date)}
              placeholderText={isDesktop ? "Filter by date end" : "End"}
              className={`${isDesktop ? "" : "w-16"} rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
            />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    title={
                      header.column.getCanSort()
                        ? header.column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                        : undefined
                    }
                  >
                    {" "}
                    <p className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}{" "}
                      {{
                        asc: (
                          <AArrowUp
                            className="text-accent-foreground"
                            size={15}
                          />
                        ),
                        desc: (
                          <AArrowDown
                            className="text-accent-foreground"
                            size={15}
                          />
                        ),
                      }[header.column.getIsSorted() as string] ?? null}
                    </p>
                  </TableHead>
                ))}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            return (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
