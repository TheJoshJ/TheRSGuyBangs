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
export const useBangStats = (type: "video" | "vod") => {
  const statsQuery = useQuery({
    queryKey: ["bangStats" + type],
    queryFn: () => fetchBangsData(type),
  });

  const loading = statsQuery.isLoading || statsQuery.isLoading;
  const error = statsQuery.isError || statsQuery.isError;
  const data = statsQuery.data ?? [];

  return {
    loading,
    error,
    data: {
      mostBangs: findExtremeBang(data, true),
      leastBangs: findExtremeBang(data, false),
    },
  };
};
