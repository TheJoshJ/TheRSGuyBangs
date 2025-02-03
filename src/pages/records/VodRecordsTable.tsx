import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface VideoRecord {
  videoId: string;
  title: string;
  datePublished: string;
  bangCount: number;
}

export const VodRecordsTable = () => {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
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
        const response = await fetch("/vod_counts.json");
        const data = await response.json();
        console.log(data)

        const formattedData: VideoRecord[] = data.map((item: any) => ({
          videoId: item.videoId,
          title: item.title,
          datePublished: item.publishedAt,
          bangCount: parseInt(item.bang_count, 10) || 0,
        }));

        setVideos(formattedData);
      } catch (error) {
        console.error("Error fetching JSON:", error);
      }
    };

    fetchJSON();
  }, []);

  // Sort videos based on selected column
  const sortedVideos = [...videos].sort((a, b) => {
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
        <TableCaption>List of videos and their bang count.</TableCaption>
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
              className="text-right cursor-pointer"
            >
              Bang Count <ArrowUpDown className="inline ml-1 h-4 w-4" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVideos.map((video, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {video.title}
                </a>
              </TableCell>
              <TableCell className="text-right text-primary">{formatDate(video.datePublished)}</TableCell>
              <TableCell className="text-right text-primary">{video.bangCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
