import React from "react";

interface MediaItem {
  title: string;
  thumbnail: string;
  description: string;
}

const videos: MediaItem[] = [
  {
    title: "We need to talk about my future in the RuneScape community.",
    thumbnail: "https://i.ytimg.com/vi/TpRLuboKQKE/hqdefault.jpg",
    description: "0 total bangs.",
  },
  {
    title:
      "The 25 Hour Grind for a HUGE upgrade! | Style Locked Group Ironman (#9)",
    thumbnail: "https://i.ytimg.com/vi/3nP7zKUa7WA/hqdefault.jpg",
    description: "35 total bangs.",
  },
];

const streams: MediaItem[] = [
  {
    title: "Epic Stream 1",
    thumbnail: "https://via.placeholder.com/300x180",
    description: "Watch the latest stream!",
  },
  {
    title: "Epic Stream 2",
    thumbnail: "https://via.placeholder.com/300x180",
    description: "Another amazing stream replay.",
  },
];

const MediaSection = ({
  title,
  items,
}: {
  title: string;
  items: MediaItem[];
}) => (
  <div className="w-full">
    <h2 className="text-3xl font-bold text-center">{title}</h2>
    <p className="font-bold mb-4 text-center">(since 12/1/2024)</p>
    <div className="grid grid-cols-2 gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col items-center">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full rounded-lg shadow-lg"
          />
          <h3 className="mt-2 text-lg max-w-[400px] min-h-[75px] text-center font-semibold">
            {item.title}
          </h3>
          <p className=" text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const MediaGallery = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col gap-[100px] space-y-10">
        <MediaSection title="Video Records" items={videos} />
        {/* <MediaSection title="Stream Records" items={streams} /> */}
      </div>
    </div>
  );
};

export default MediaGallery;
