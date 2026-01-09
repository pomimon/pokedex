import { IMAGE_URLS } from "@/consts/urls";

export const getSpriteUrl = (id: number) => {
  return `${IMAGE_URLS.gif}/${id}.gif`;
};
