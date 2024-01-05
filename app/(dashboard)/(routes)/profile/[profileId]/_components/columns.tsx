"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Project } from "@prisma/client";
import { Preview } from "@/components/description-preview";
import * as cheerio from "cheerio";

export const columns: ColumnDef<Project>[] = [
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
      );
    },
    cell: ({ row }) => {
      const { id, title } = row.original;

      return (
        <div>
          <Link
            href={`/listing/${id}`}
            target="_blank"
            className="font-medium italic text-primary hover:text-blue-800 transition hover:underline"
          >
            {title}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const description = row.original.description;
      const cheerioDescription = cheerio.load(description || "");
      const textContent = cheerioDescription.text();
      const truncatedDescription =
        textContent.slice(0, 170) + (textContent.length > 100 ? "..." : "");

      return (
        <div>
          <Preview value={truncatedDescription} />
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZoneName: "short",
      }).format(updatedAt);

      return <div className="ml-3">{formattedDate}</div>;
    },
  },
];