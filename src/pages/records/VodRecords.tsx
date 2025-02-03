import { getBangStats } from "@/utils/getBangStats";
import { Card } from "@/components/ui/card";

const VodRecords = () => {
  const { vod } = getBangStats();

  return (
    <div className="p-6">
      <div className="flex flex-row gap-6">
        {vod.leastBangs && (
          <Card className="flex flex-col items-center p-4">
            <img
              src={`https://img.youtube.com/vi/${vod.leastBangs.videoId}/maxresdefault.jpg`}
              alt={vod.leastBangs.title}
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
            <a
                href={`https://www.youtube.com/watch?v=${vod.leastBangs.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {vod.leastBangs.title}
              </a>
            </h3>
            <p className="text-gray-400">
              Least Bangs: {vod.leastBangs.bang_count}
            </p>
          </Card>
        )}
        {vod.mostBangs && (
          <Card className="flex flex-col items-center p-4">
            <img
              src={`https://img.youtube.com/vi/${vod.mostBangs.videoId}/maxresdefault.jpg`}
              alt={vod.mostBangs.title}
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
            <a
                href={`https://www.youtube.com/watch?v=${vod.mostBangs.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {vod.mostBangs.title}
              </a>
            </h3>
            <p className="text-gray-400">
              Most Bangs: {vod.mostBangs.bang_count}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VodRecords;
