import videoData from "@/data/video_counts.json";
import vodData from "@/data/vod_counts.json";

interface VideoRecord {
  videoId: string;
  title: string;
  publishedAt: string;
  bang_count: number;
}

// Function to find most/least bangs in a single dataset
const findExtremeBang = (arr: VideoRecord[], isMax: boolean) => {
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

// Function to get the stats separately for videos and VODs
export const getBangStats = () => {
  const formattedVideos: VideoRecord[] = videoData.map((item) => ({
    ...item,
    bang_count: item.bang_count || 0,
  }));

  const formattedVods: VideoRecord[] = vodData.map((item) => ({
    ...item,
    bang_count: item.bang_count || 0,
  }));

  return {
    video: {
      mostBangs: findExtremeBang(formattedVideos, true),
      leastBangs: findExtremeBang(formattedVideos, false),
    },
    vod: {
      mostBangs: findExtremeBang(formattedVods, true),
      leastBangs: findExtremeBang(formattedVods, false),
    },
  };
};

// Usage Example
const { video, vod } = getBangStats();
console.log("Video with Most Bangs:", video.mostBangs);
console.log("Video with Least Bangs:", video.leastBangs);
console.log("VOD with Most Bangs:", vod.mostBangs);
console.log("VOD with Least Bangs:", vod.leastBangs);