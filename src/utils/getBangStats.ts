import { useQuery } from "@tanstack/react-query";

export interface VideoRecord {
  videoId: string;
  title: string;
  publishedAt: string;
  bang_count: number;
}

// Function to find most/least bangs in a single dataset
const findExtremeBang = (arr: VideoRecord[], isMax: boolean) => {
  if (arr.length === 0) return null; // Handle empty arrays gracefully

  return arr.reduce((extreme, item) => {
    const currentBangCount = item.bang_count || 0;
    const extremeBangCount = extreme.bang_count || 0;

    if (
      (isMax && currentBangCount > extremeBangCount) ||
      (!isMax && currentBangCount < extremeBangCount) ||
      (currentBangCount === extremeBangCount &&
        new Date(item.publishedAt) > new Date(extreme.publishedAt)) // Tiebreaker
    ) {
      return item;
    }

    return extreme;
  }, arr[0]); // Start with the first item
};

// Function to fetch data from API
const fetchBangsData = async (
  type: "video" | "vod"
): Promise<VideoRecord[]> => {
  const endpoint =
    type === "video"
      ? "https://api.thersguybangs.com/api/v1/videos"
      : "https://api.thersguybangs.com/api/v1/vods";

  const response = await fetch(endpoint);
  if (!response.ok) throw new Error(`Failed to fetch ${type} data`);

  return response.json();
};

// Hook to fetch and compute bang stats dynamically
export const useBangStats = () => {
  const videoQuery = useQuery({
    queryKey: ["bangStats", "video"],
    queryFn: () => fetchBangsData("video"),
  });

  const vodQuery = useQuery({
    queryKey: ["bangStats", "vod"],
    queryFn: () => fetchBangsData("vod"),
  });

  const isLoading = videoQuery.isLoading || vodQuery.isLoading;
  const isError = videoQuery.isError || vodQuery.isError;

  const videoData = videoQuery.data ?? []; // Ensure default empty array
  const vodData = vodQuery.data ?? []; // Ensure default empty array

  return {
    isLoading,
    isError,
    video: {
      mostBangs: findExtremeBang(videoData, true),
      leastBangs: findExtremeBang(videoData, false),
    },
    vod: {
      mostBangs: findExtremeBang(vodData, true),
      leastBangs: findExtremeBang(vodData, false),
    },
  };
};
