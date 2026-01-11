import { PokemonType } from "@/types";
import { getTypeColor } from "./getTypeColor";

export const getPokeColor = (types: PokemonType[]) => {
  if (types.length === 1) {
    const color = getTypeColor(types[0]!);
    return { typeColorA: color, typeColorB: color };
  }

  if (types.length >= 2) {
    return {
      typeColorA: getTypeColor(types[0]!),
      typeColorB: getTypeColor(types[1]!),
    };
  }

  return {
    typeColorA: "#000",
    typeColorB: "#000",
  };
};
