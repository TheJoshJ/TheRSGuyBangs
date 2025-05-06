import { useEffect, useRef, useState } from "react";
import YoutubeEmbed from "./YoutubeEmbed";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bang, Blast } from "@/hooks/getBangs";
import { FormatTimestamp } from "@/utils/formatTimestamp";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecordHighlightsProps {
  bangData: Bang[];
  blastData: Blast[];
  id: string;
}

const RecordHighlights = ({ bangData, blastData, id }: RecordHighlightsProps) => {
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
      <div className="max-w-[100%]">
        <div ref={videoContainerRef}>
          <YoutubeEmbed id={id} start={videoStartTime} />
        </div>
      </div>

      {/* Right Column: Scrollable List */}
      <Tabs defaultValue="bangs" className="w-[100%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bangs">Bangs</TabsTrigger>
          <TabsTrigger value="blasts">Blasts</TabsTrigger>
        </TabsList>
        <TabsContent value="bangs">
          <div
            className="max-w-[100%] flex flex-col"
            style={{ height: videoHeight ? `${videoHeight - 45}px` : "auto" }}
          >
            <ScrollArea className="overflow-auto rounded-md h-full">
              <div className="p-2">
                {bangData.map((instance, index) => (
                  <div
                    className="flex flex-row my-2 py-2 gap-4 border-primary border-l-[5px] cursor-pointer"
                    key={index}
                    onClick={() => {
                      setVideoStartTime(instance.timestamp);
                    }}
                  >
                    <div className="w-[8%] text-right">
                      {FormatTimestamp(instance.timestamp)}
                    </div>
                    <div className="w-[90%] italic">
                      "{instance.transcript}"
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
        <TabsContent value="blasts">
          <div
            className="max-w-[100%] flex flex-col"
            style={{ height: videoHeight ? `${videoHeight - 45}px` : "auto" }}
          >
            <ScrollArea className="overflow-auto rounded-md h-full">
              <div className="p-2">
                {blastData.map((instance, index) => (
                  <div
                    className="flex flex-row my-2 py-2 gap-4 border-primary border-l-[5px] cursor-pointer"
                    key={index}
                    onClick={() => {
                      setVideoStartTime(instance.timestamp);
                    }}
                  >
                    <div className="w-[8%] text-right">
                      {FormatTimestamp(instance.timestamp)}
                    </div>
                    <div className="w-[90%] italic">
                      "{instance.transcript}"
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecordHighlights;
