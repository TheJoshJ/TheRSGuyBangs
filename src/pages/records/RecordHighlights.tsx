import { useBangStats } from "@/utils/getBangStats";

interface RecordHighlightsProps {
  type: "video" | "vod";
}

const RecordHighlights: React.FC<RecordHighlightsProps> = ({ type }) => {
  const stats = useBangStats()[type];

  return (
    <div className="p-6">
      <div className="flex flex-row gap-6">
        {/* Least Bangs */}
        {stats.leastBangs && (
          <div className="flex flex-col items-center p-4">
            <img
              src={`https://img.youtube.com/vi/${stats.leastBangs.videoId}/maxresdefault.jpg`}
              alt={stats.leastBangs.title}
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
              <a
                href={`https://www.youtube.com/watch?v=${stats.leastBangs.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {stats.leastBangs.title}
              </a>
            </h3>
            <p className="text-gray-400">
              Least Bangs: {stats.leastBangs.bang_count}
            </p>
          </div>
        )}

        {/* Most Bangs */}
        {stats.mostBangs && (
          <div className="flex flex-col items-center p-4">
            <img
              src={`https://img.youtube.com/vi/${stats.mostBangs.videoId}/maxresdefault.jpg`}
              alt={stats.mostBangs.title}
              className="w-full rounded-lg shadow-lg"
            />
            <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
              <a
                href={`https://www.youtube.com/watch?v=${stats.mostBangs.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {stats.mostBangs.title}
              </a>
            </h3>
            <p className="text-gray-400">
              Most Bangs: {stats.mostBangs.bang_count}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordHighlights;
