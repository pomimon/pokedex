import { DEFAULT_COLOR, TYPE_COLORS } from "@/consts/colors";
import { PokemonType } from "@/types";

export const getTypeColor = (type: PokemonType) => {
  return TYPE_COLORS[type] ?? DEFAULT_COLOR;
};
