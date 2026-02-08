/**
 * Evolution API
 * 
 * Handles API calls for evolution chain data.
 * Evolution chains show how Pokemon evolve (e.g., Bulbasaur -> Ivysaur -> Venusaur)
 */

export const evolutionApi = {
  /**
   * Fetch evolution chain data from a given URL
   * Note: The URL comes from the species data
   */
  async fetchEvolutionChain(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch evolution chain: ${response.statusText}`);
    }
    return response.json();
  },
};
