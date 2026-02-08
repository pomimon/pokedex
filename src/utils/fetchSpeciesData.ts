export const fetchSpeciesData = async (pokemonId: number) => {
  const URL = `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`;
  const response = await fetch(URL);
  return response.json();
};
