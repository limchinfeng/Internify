"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface CompanyApplicationDataColumnsProps {
  id: string;
  createdAt: Date;
  listingId: string;
  title: string;
  candidate: string;
  userId: string;
  email: string;
}

export const company_application_columns: ColumnDef<CompanyApplicationDataColumnsProps>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { id, title } = row.original;

      return (
        <div>
          <Link
            href={`/listing/${id}`}
            target="_blank"
            className="font-medium text-primary hover:text-blue-800 transition hover:underline"
          >
            {title}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "candidate",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Candidate
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { userId, candidate } = row.original;

      return (
        <div>
          <Link
            href={`/profile/${userId}`}
            target="_blank"
            className="font-medium text-primary hover:text-blue-800 transition hover:underline"
          >
            {candidate}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: 'short',
      }).format(createdAt);
  
      return <div className="ml-3">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const {id, userId} = row.original;

      const onDelete = async (id: string, userId: string) => {
        try {
          await axios.delete(`/api/company/listing/${id}/${userId}`);
          toast.success("Application deleted");
          window.location.reload();
        } catch {
          toast.error("Something went wrong");
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-4 w-8 p-0">
              <span className="sr-only">
                Open menu
              </span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div
              onClick={() => onDelete(id, userId)}
            >
              <DropdownMenuItem>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]