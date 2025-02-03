import { useState } from "react";
import { VideoRecordsTable } from "./VideoRecordsTable";
import { VodRecordsTable } from "./VodRecordsTable"; // Assuming you have this
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoRecords from "./VideoRecords";
import VodRecords from "./VodRecords";

const MediaGallery = () => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <Tabs defaultValue="videos" className="w-full">
        {/* Tab Switcher */}
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="streams">Streams</TabsTrigger>
        </TabsList>

        {/* Videos Tab */}
        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Video Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gap-6">
                <VideoRecords />
              </div>
              <div className="flex flex-row justify-center pt-10">
                <Button
                  variant="ghost"
                  onClick={handleExpand}
                  className="text-centercursor-pointer"
                >
                  {expanded ? "Hide" : "Show"} Source
                </Button>
              </div>
              {expanded && (
                <div className="mt-4 p-4 border rounded-lg text-white">
                  <ScrollArea>
                    <VideoRecordsTable />
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Streams Tab */}
        <TabsContent value="streams">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-3xl">
                Stream Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="gap-6">
              <VodRecords/>
              </div>
              <div className="flex flex-row justify-center pt-10">
                <Button
                  variant="ghost"
                  onClick={handleExpand}
                  className="text-centercursor-pointer"
                >
                  {expanded ? "Hide" : "Show"} Source
                </Button>
              </div>
              {expanded && (
                <div className="mt-4 p-4 border rounded-lg text-white">
                  <ScrollArea>
                    <VodRecordsTable />
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
