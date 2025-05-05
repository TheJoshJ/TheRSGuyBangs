import { useQuery } from "@tanstack/react-query";

export interface Bang {
  timestamp: number;
  transcript: string;
}
export interface Blast {
  timestamp: number;
  transcript: string;
}

export interface VideoRecord {
  source?: "videos" | "vods";
  videoId: string;
  title: string;
  publishedAt: string;
  fileName: string;
  bang_count: number;
  bangs: Bang[];
  blast_count: number;
  blasts: Blast[]
}

// Fetch videos
const fetchVideosBlastsData = async (): Promise<VideoRecord[]> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/videos");
  if (!response.ok) {
    throw new Error("Failed to fetch videos data");
  }

  const data = await response.json();
  return data.map((item: Omit<VideoRecord, "source">) => ({
    ...item,
    source: "video",
  }));
};

// Fetch VODs
const fetchVodsBlastsData = async (): Promise<VideoRecord[]> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/vods");
  if (!response.ok) {
    throw new Error("Failed to fetch VODs data");
  }

  const data = await response.json();
  return data.map((item: Omit<VideoRecord, "source">) => ({
    ...item,
    source: "vod",
  }));
};

export const getAllBlasts = () => {
  return useQuery({
    queryKey: ["getAllBlasts"],
    queryFn: async () => {
      const [videos, vods] = await Promise.all([
        fetchVideosBlastsData(),
        fetchVodsBlastsData(),
      ]);

      return [...videos, ...vods];
    },
  });
};
