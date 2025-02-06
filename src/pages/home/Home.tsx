import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getTotalBangs } from "@/hooks/getTotalBangs";
import { RotateCcw } from "lucide-react";
import { getLiveStatus } from "@/hooks/getLiveStatus";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

function Home() {
  const [bangs, setBangs] = useState(0);
  const { data, isLoading, isError } = getTotalBangs(); // Fetch data
  const { toast } = useToast();

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const today = getCurrentDate();
    const storedBangs = localStorage.getItem(`bangs-${today}`);

    if (storedBangs) {
      setBangs(parseInt(storedBangs, 10));
    }
  }, []);

  const handleBang = () => {
    const today = getCurrentDate();
    const newBangs = bangs + 1;

    setBangs(newBangs);
    localStorage.setItem(`bangs-${today}`, newBangs.toString());
  };

  const handleReset = () => {
    const today = getCurrentDate();
    setBangs(0);
    localStorage.setItem(`bangs-${today}`, "0");
  };

  const showToast = () => {
    toast({
      title: "TheRSGuy is LIVE",
      description: `If you're lucky, you might see him "bang" on stream!`,
      duration: 15000,
      variant: "default",
      className:
        "top-0 right-0 flex fixed md:max-w-[550px] md:top-4 md:right-4",
      action: (
        <ToastAction
          className="bg-secondary min-h-10"
          onClick={() => {
            window.open(
              "https://twitch.tv/thersguy",
              "_blank",
              "noopener,noreferrer"
            );
          }}
          altText="View the livestream"
        >
          Go to Stream!
        </ToastAction>
      ),
    });
  };

  const liveStatus = getLiveStatus();

  useEffect(() => {
    if (liveStatus.data?.live === true) {
      showToast();
    }
  }, [liveStatus.data?.live]);

  // Use a default value of 0 if data is undefined
  const totalBangs = (data?.total_bangs ?? 0) + bangs;

  return (
    <div className="grid grid-rows-3 h-[calc(100vh-70px)]">
      <div className="flex items-end justify-center pb-4">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-5xl font-bold">TheRSGuy Bangs!</h1>
          {isLoading ? (
            <p>Counting how many times he's banged...</p>
          ) : isError ? (
            <p>In fact, he's banged so many times that we lost count!</p>
          ) : (
            <p>In fact, he's banged {totalBangs} times!</p>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 justify-center">
        <div
          className="rounded-xl"
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
          }}
        >
          <Button onClick={handleBang}>HE BANGED AGAIN!</Button>
        </div>
        <div className="rounded-xl">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw />
          </Button>
        </div>
      </div>
      <div className="flex items-end justify-center pb-4">
        <a
          href={"https://rs3pd.com"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Check out my other site!
        </a>
      </div>
    </div>
  );
}

export default Home;
