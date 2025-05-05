import { useQuery } from "@tanstack/react-query";

export interface Bangs {
  total_bangs: number;
}

export interface Blasts {
  total_blasts: number;
}

const fetchTotalBangsData = async (): Promise<Bangs> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/bangs");

  if (!response.ok) {
    throw new Error("Failed to fetch bangs data");
  }

  return response.json();
};

const fetchTotalBlastsData = async (): Promise<Blasts> => {
  const response = await fetch("https://api.thersguybangs.com/api/v1/blasts");

  if (!response.ok) {
    throw new Error("Failed to fetch blast data");
  }

  return response.json();
};

export const getTotalBangs = () => {
  return useQuery({
    queryKey: ["TotalBangs"],
    queryFn: () => fetchTotalBangsData(),
  });
};

export const getTotalBlasts = () => {
  return useQuery({
    queryKey: ["TotalBlasts"],
    queryFn: () => fetchTotalBlastsData(),
  });
};
