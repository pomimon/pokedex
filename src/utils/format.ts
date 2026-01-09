export const formatId = (id: number) => {
  return `#${id.toString().padStart(3, "0")}`;
};
