export const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
