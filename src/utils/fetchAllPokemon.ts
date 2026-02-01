import { fetchPokemonDetails } from "./fetchPokemonDetails";

export const fetchAllPokemon = async () => {
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";
  const response = await fetch(URL);
  const json = await response.json();

  const promises = json.results.map((pokemon: { url: string }) =>
    fetchPokemonDetails(pokemon.url),
  );

  return await Promise.all(promises);
};
