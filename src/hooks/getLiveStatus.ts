import { useQuery } from "@tanstack/react-query";

export interface Live {
  live: boolean;
}

const getLive = async (): Promise<Live> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/live");

  if (!response.ok) {
    throw new Error("Failed to fetch livestream data");
  }

  return response.json();
};

export const getLiveStatus = () => {
  return useQuery({
    queryKey: ["LiveCheck"],
    queryFn: () => getLive(),
  });
};
