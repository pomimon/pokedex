import { PokemonType } from "@/types";

export const transformPokemonData = (json: any) => {
  return {
    id: json.id,
    name: json.name,
    height: json.height,
    weight: json.weight,
    types: json.types.map(
      (type: { type: { name: string } }) =>
        type.type.name as keyof typeof PokemonType,
    ),
    base_experience: json.base_experience,
    stats: json.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
};
