import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import videoData from "@/data/video_counts.json";
import vodData from "@/data/vod_counts.json";

function Home() {
  const [bangs, setBangs] = useState(0);

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
    const newBangs = 0;

    setBangs(newBangs);
    localStorage.setItem(`bangs-${today}`, newBangs.toString());
  };

  const getTotalBangs = (): number => {
    return [...videoData, ...vodData].reduce(
      (sum, item) => sum + (item.bang_count || 0),
      0
    );
  };

// Usage Example
console.log("Total Bangs:", getTotalBangs());


  return (
    <div className="grid grid-rows-3 h-[calc(100vh-70px)]">
      <div className="flex items-end justify-center pb-4">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-5xl font-bold">TheRSGuy Bangs!</h1>
          <p>Apparently he's done it {getTotalBangs() + bangs} times!</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div
          className="rounded-xl"
          style={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.4)",
          }}
        >
          <Button onClick={handleBang}>HE BANGED AGAIN!</Button>
        </div>
      </div>
      <div className="flex items-end justify-center pb-4">
        <p onClick={handleReset}>Reset Counter</p>
      </div>
    </div>
  );
}

export default Home;
