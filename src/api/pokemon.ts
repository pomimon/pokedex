/**
 * Pokemon API
 * 
 * Handles all API calls related to Pokemon data.
 * Separated from business logic and state management for easier testing and maintenance.
 */

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = {
  /**
   * Fetch the list of Pokemon (just names and URLs)
   */
  async fetchList(limit = 151, offset = 0) {
    // return await P.getPokemonsList({ limit, offset })
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon list: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Fetch detailed information for a single Pokemon
   */
  async fetchDetails(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon details: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Fetch all 151 Pokemon with their details
   * This is the main entry point for loading the Pokedex
   */
  async fetchAll() {
    const data = await this.fetchList();
    const promises = data.results.map((pokemon: { url: string }) =>
      this.fetchDetails(pokemon.url)
    );
    return Promise.all(promises);
  },
};
