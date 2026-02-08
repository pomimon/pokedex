/**
 * Species API
 * 
 * Handles API calls for Pokemon species data, which includes:
 * - Flavor text (Pokedex descriptions)
 * - Evolution chain URLs
 * - Habitat, color, shape, etc.
 */

const BASE_URL = 'https://pokeapi.co/api/v2';

export const speciesApi = {
  /**
   * Fetch species data for a Pokemon by ID
   * This includes flavor text and evolution chain URL
   */
  async fetchSpecies(pokemonId: number) {
    const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonId}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch species data: ${response.statusText}`);
    }
    return response.json();
  },
};
