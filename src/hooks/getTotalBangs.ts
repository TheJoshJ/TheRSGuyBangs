import { useQuery } from "@tanstack/react-query";

export interface Bangs {
  total_bangs: number;
}

const fetchTotalBangsData = async (): Promise<Bangs> => {
  const response = await fetch("https://api.thersguybangs.com/bangs");

  if (!response.ok) {
    throw new Error("Failed to fetch bangs data");
  }

  return response.json();
};

export const getTotalBangs = () => {
  return useQuery({
    queryKey: ["TotalBangs"],
    queryFn: () => fetchTotalBangsData(),
  });
};
