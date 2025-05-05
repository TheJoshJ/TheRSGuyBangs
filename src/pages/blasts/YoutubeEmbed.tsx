import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface YoutubeEmbedProps {
  id: string;
  start?: number;
}

export const YoutubeEmbed = ({ id, start }: YoutubeEmbedProps) => {
  const startParam = !start ? `start=0` : `start=${start-2}`;

  return (
    <div className={"min-h-10"}>
      <LiteYouTubeEmbed
        id={id}
        title="Nexo de código aberto"
        params={startParam}
        poster="maxresdefault"
      />
    </div>
  );
};

export default YoutubeEmbed;
