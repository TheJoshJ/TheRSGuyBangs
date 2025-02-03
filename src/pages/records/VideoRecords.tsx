import { getBangStats } from "@/utils/getBangStats";
import { Card } from "@/components/ui/card";

const VideoRecords = () => {
  const { video } = getBangStats();

  return (
    <div className="p-6">
      <div className="flex flex-row gap-6">
        {video.leastBangs && (
          <Card className="flex flex-col items-center p-4">
            <img
              src={`https://img.youtube.com/vi/${video.leastBangs.videoId}/maxresdefault.jpg`}
              alt={video.leastBangs.title}
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
              <a
                href={`https://www.youtube.com/watch?v=${video.leastBangs.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {video.leastBangs.title}
              </a>
            </h3>
            <p className="text-gray-400">
              Least Bangs: {video.leastBangs.bang_count}
            </p>
          </Card>
        )}
        {video.mostBangs && (
          <Card className="flex flex-col items-center p-4">
            <img
              src={`https://img.youtube.com/vi/${video.mostBangs.videoId}/maxresdefault.jpg`}
              alt={video.mostBangs.title}
            />
            <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
              <a
                href={`https://www.youtube.com/watch?v=${video.mostBangs.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {video.mostBangs.title}
              </a>
            </h3>
            <p className="text-gray-400">
              Most Bangs: {video.mostBangs.bang_count}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoRecords;
