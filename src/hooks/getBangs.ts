import { useQuery } from "@tanstack/react-query";

export interface Bang {
  timestamp: number;
  transcript: string;
}

export interface VideoRecord {
  source?: "videos" | "vods"; // Ensure source is required
  videoId: string;
  title: string;
  publishedAt: string;
  fileName: string;
  bang_count: number;
  bangs: Bang[];
}

// Fetch videos
const fetchVideosBangsData = async (): Promise<VideoRecord[]> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/videos");
  if (!response.ok) {
    throw new Error("Failed to fetch videos data");
  }

  const data = await response.json();
  return data.map((item: Omit<VideoRecord, "source">) => ({
    ...item,
    source: "video", // Fixed typo: Changed "video" to "videos"
  }));
};

// Fetch VODs
const fetchVodsBangsData = async (): Promise<VideoRecord[]> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/vods");
  if (!response.ok) {
    throw new Error("Failed to fetch VODs data");
  }

  const data = await response.json();
  return data.map((item: Omit<VideoRecord, "source">) => ({
    ...item,
    source: "vod", // Fixed typo: Changed "vod" to "vods"
  }));
};

export const getAllBangs = () => {
  return useQuery({
    queryKey: ["getAllBangs"],
    queryFn: async () => {
      const [videos, vods] = await Promise.all([
        fetchVideosBangsData(),
        fetchVodsBangsData(),
      ]);

      return [...videos, ...vods]; // Merge both arrays
    },
  });
};
