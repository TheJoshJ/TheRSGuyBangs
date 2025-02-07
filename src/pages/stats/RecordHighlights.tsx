import { useEffect, useRef, useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bang } from "@/hooks/getBangs";
import { FormatTimestamp } from "@/utils/formatTimestamp";

interface RecordHighlightsProps {
  data: Bang[];
  id: string;
}

const RecordHighlights = ({ data, id }: RecordHighlightsProps) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [videoHeight, setVideoHeight] = useState<number | null>(null);
  const [videoStartTime, setVideoStartTime] = useState<number>(0);

  useEffect(() => {
    if (videoContainerRef.current) {
      setVideoHeight(videoContainerRef.current.clientHeight);
    }
  }, [id]);
  return (
    <div className="min-w-[100%] grid grid-cols-2 grid-rows-1 gap-4">
      {/* Left Column: Video Embed */}
      <div
        className="max-w-[100%]"
      >
        <div ref={videoContainerRef}>
          <YoutubeEmbed id={id} start={videoStartTime} />
        </div>
      </div>

      {/* Right Column: Scrollable List */}
      <div
        className="max-w-[100%] flex flex-col"
        style={{ height: videoHeight ? `${videoHeight}px` : "auto" }}
      >
        <ScrollArea className="overflow-auto rounded-md h-full">
          <div className="p-2">
            {data.map((instance, index) => (
              <div
                className="flex flex-row my-2 py-2 gap-10 border-muted-foreground border rounded cursor-pointer"
                key={index}
                onClick={() => {
                  setVideoStartTime(instance.timestamp);
                }}
              >
                <div className="w-[10%] text-right">
                  {FormatTimestamp(instance.timestamp)}
                </div>
                <div className="w-[90%]">"{instance.transcript}"</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default RecordHighlights;
