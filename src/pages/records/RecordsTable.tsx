import { useEffect, useState } from "react";
import { ArrowUpDown, EllipsisIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecordsSlide } from "./RecordsSlide";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

interface BangRecord {
  timestamp: number;
  transcript: string;
}

interface VideoRecord {
  videoId: string;
  title: string;
  datePublished: string;
  bangCount: number;
  bangs?: BangRecord[]; // Optional, since it may not always be present
}

interface RecordsTableProps {
  type: "video" | "vod";
}

export const RecordsTable: React.FC<RecordsTableProps> = ({ type }) => {
  const [records, setRecords] = useState<VideoRecord[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof VideoRecord | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    const fetchJSON = async () => {
      try {
        const endpoint =
          type === "video"
            ? "https://api.thersguybangs.com/api/v1/videos"
            : "https://api.thersguybangs.com/api/v1/vods";

        const response = await fetch(endpoint);
        const data = await response.json();

        const formattedData: VideoRecord[] = data.map((item: any) => ({
          videoId: item.videoId,
          title: item.title,
          datePublished: item.publishedAt,
          bangCount: parseInt(item.bang_count, 10) || 0,
          bangs: item.bangs || [], // Ensure it's always an array, even if missing
        }));

        setRecords(formattedData);
      } catch (error) {
        console.error(`Error fetching ${type} data:`, error);
      }
    };

    fetchJSON();
  }, [type]);

  // Sort records based on selected column
  const sortedRecords = [...records].sort((a, b) => {
    if (!sortColumn) return 0;

    const valueA = a[sortColumn];
    const valueB = b[sortColumn];

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    } else if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    }
    return 0;
  });

  // Handle column sorting
  const handleSort = (column: keyof VideoRecord) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <Table>
        <TableCaption>
          List of {type === "video" ? "videos" : "VODs"} and their bang count.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("title")}
              className="cursor-pointer"
            >
              Title <ArrowUpDown className="inline ml-1 h-4 w-4" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("datePublished")}
              className="cursor-pointer"
            >
              Date <ArrowUpDown className="inline ml-1 h-4 w-4" />
            </TableHead>
            <TableHead
              onClick={() => handleSort("bangCount")}
              className="text-right cursor-pointer min-w-[100px]"
            >
              Bangs <ArrowUpDown className="inline ml-1 h-4 w-4" />
            </TableHead>
            <TableHead className="text-right cursor-pointer min-w-[100px]">
              Details
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <a
                  href={`https://www.youtube.com/watch?v=${record.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {record.title}
                </a>
              </TableCell>
              <TableCell className="text-right text-primary">
                {formatDate(record.datePublished)}
              </TableCell>
              <TableCell className="text-right text-primary">
                {record.bangCount}
              </TableCell>
              <TableCell>
                <div className={"flex flex-row justify-end"}>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline">
                        <EllipsisIcon/>
                      </Button>
                    </SheetTrigger>
                    <RecordsSlide record={record} />
                  </Sheet>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Conditional Bangs Display */}
      <div className="mt-6"></div>
    </div>
  );
};
