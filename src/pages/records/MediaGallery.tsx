import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RecordHighlights from "./RecordHighlights";
import { RecordsTable } from "./RecordsTable";

const MediaGallery = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"video" | "vod">("video");

  const handleExpand = () => setExpanded(!expanded);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Tabs
        defaultValue="video"
        className="w-full"
        onValueChange={(value) =>
          setSelectedTab(value === "video" ? "video" : "vod")
        }
      >
        {/* Tab Switcher */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="vod">Streams</TabsTrigger>
        </TabsList>

        {/* Dynamic Content */}
        <TabsContent value={selectedTab}>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                {selectedTab === "video" ? "Video Records" : "Stream Records"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gap-6">
                <RecordHighlights type={selectedTab} />
              </div>
              <div className="flex flex-row justify-center pt-10">
                <Button
                  variant="ghost"
                  onClick={handleExpand}
                  className="text-center cursor-pointer"
                >
                  {expanded ? "Hide" : "Show"} Source
                </Button>
              </div>
              {expanded && (
                <div className="mt-4 p-4 rounded-lg text-white">
                  <ScrollArea>
                    <RecordsTable type={selectedTab} />
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MediaGallery;
