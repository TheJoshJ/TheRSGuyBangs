import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, DownloadIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import RecordHighlights from "./RecordHighlights";
import { Bang, Blast, getAllBangs, VideoRecord } from "@/hooks/getBangs";
import { FormatTimestamp } from "@/utils/formatTimestamp";

export const columns: ColumnDef<VideoRecord>[] = [
  {
    accessorKey: "source",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Platform
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("source")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "publishedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-4">
        {formatDate(row.getValue("publishedAt"))}
      </div>
    ),
  },
  {
    accessorKey: "bang_count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Bangs
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-4">{row.getValue("bang_count")}</div>
    ),
  },
  {
    accessorKey: "blast_count",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Blasts
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-4">{row.getValue("blast_count")}</div>
    ),
  },
  {
    accessorKey: "videoId",
    header: "Data",
    cell: ({ row }) => {
      const rowData = row.original;

      const handleDownloadCSV = () => {
        const { title, bangs = [], blasts = [] } = rowData;

        const rows = [
          ...bangs.map((b) => ({ type: "bang", ...b })),
          ...blasts.map((b) => ({ type: "blast", ...b })),
        ];

        const header = "type,timestamp,transcript";
        const csvContent = [
          header,
          ...rows.map((r) =>
            [
              r.type,
              FormatTimestamp(r.timestamp),
              `"${r.transcript.replace(/"/g, '""')}"`,
            ].join(",")
          ),
        ].join("\n");

        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `${title.replace(/[\\/:*?"<>|]/g, "")}-stats.csv`
        );
        link.click();
      };

      return (
        <DownloadIcon
          onClick={handleDownloadCSV}
          size="20px"
          className="cursor-pointer"
        />
      );
    },
  },
];

export const RecordsTable = () => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "publishedAt", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [selectedRow, setSelectedRow] = useState<string>("0");

  const { data: records } = getAllBangs();

  //Set the selected video to the first in the array
  useEffect(() => {
    if (records !== undefined) {
      setSelectedRow(records[0].videoId);
    }
  }, [records]);

  const getBangsForSelectedRow = (
    records: VideoRecord[],
    selectedRow: string
  ): Bang[] => {
    const foundRecord = records.find(
      (record) => record.videoId === selectedRow
    );
    return foundRecord?.bangs ?? [];
  };

  const getBlastsForSelectedRow = (
    records: VideoRecord[],
    selectedRow: string
  ): Blast[] => {
    const foundRecord = records.find(
      (record) => record.videoId === selectedRow
    );
    return foundRecord?.blasts ?? [];
  };

  const table = useReactTable({
    data: records ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="w-full rounded border">
      {/* Youtube Embed & Timestamps */}
      <RecordHighlights
        bangData={getBangsForSelectedRow(records ?? [], selectedRow)}
        blastData={getBlastsForSelectedRow(records ?? [], selectedRow)}
        id={selectedRow}
      />
      {/* React Table */}
      <div className="border-t">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setSelectedRow(row.renderValue("videoId"));
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground pl-4">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2 pr-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
