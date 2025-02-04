import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FormatTimestamp } from "@/utils/formatTimestamp";

// Define the types for a bang and a record
export interface Bang {
  timestamp: number;
  transcript: string;
}

export interface RecordItem {
  videoId: string;
  title: string;
  bangCount: number;
  bangs?: Bang[];
}

interface RecordsSlideProps {
  record: RecordItem;
}

export const RecordsSlide: React.FC<RecordsSlideProps> = ({ record }) => {
  return (
    <SheetContent className="min-w-[1000px]">
      <div className="flex flex-col items-center text-center">
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-3xl text-center text-primary font-bold">
              Timestamps
            </h1>
          </SheetTitle>
          <SheetDescription>
            A time stamp for every instance of "Bang" in this video.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[100vh] w-[100%] pb-12">
          <div className="text-foreground flex flex-col items-center pb-10">
            {record.bangCount > 0 ? (
              <div className="mb-4 p-4">
                <div className="overflow-x-auto">
                  <table className="min-w-[50%] table-auto border-collapse">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2 text-left">
                          Timestamp
                        </th>
                        <th className="border px-4 py-2 text-left">
                          Transcript
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.bangs?.map((bang, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">
                            <a
                              className="text-primary font-semibold hover:underline"
                              href={`https://www.youtube.com/watch?v=${
                                record.videoId
                              }&t=${bang.timestamp - 2}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {FormatTimestamp(bang.timestamp)}
                            </a>
                          </td>
                          <td className="border px-4 py-2">
                            "{bang.transcript}"
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p>No bangs. Well done!</p>
            )}
          </div>
        </ScrollArea>
      </div>
    </SheetContent>
  );
};
