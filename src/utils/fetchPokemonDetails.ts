import { transformPokemonData } from "./transformPokemonData";

export const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return transformPokemonData(json);
};
