/**
 * Data Transformation Functions
 * 
 * Pure functions that transform raw API responses into our app's data structures.
 * These are separate from API calls so they can be tested independently.
 */

import { PokemonType, type PokemonInfo, type EvolutionChain } from '@/types';

/**
 * Transform raw Pokemon API response into our PokemonInfo type
 */
export function transformPokemonData(json: any): PokemonInfo {
  return {
    id: json.id,
    name: json.name,
    height: json.height,
    weight: json.weight,
    types: json.types.map(
      (t: { type: { name: string } }) => t.type.name as PokemonType
    ),
    stats: json.stats.map((stat: any) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
    flavourText: null,
  };
}

/**
 * Extract flavor text from species data
 * Looks for English flavor text from the most recent game version
 */
export function extractFlavorText(speciesData: any): string | null {
  const flavorTextEntries = speciesData.flavor_text_entries || [];
  
  // Find English entries
  const englishEntries = flavorTextEntries.filter(
    (entry: any) => entry.language.name === 'en'
  );
  
  if (englishEntries.length === 0) return null;
  
  // Get the most recent entry (last in array)
  const entry = englishEntries[englishEntries.length - 1];
  
  // Clean up the text (remove special characters and extra whitespace)
  return entry.flavor_text
    .replace(/\f/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Build evolution chain from the nested API response
 * Recursively walks the evolution tree and filters to first 151 Pokemon
 */
export function buildEvolutionChain(
  node: any,
  allPokemon: PokemonInfo[]
): EvolutionChain {
  const chain: EvolutionChain = [];

  function traverse(currentNode: any) {
    const id = extractIdFromUrl(currentNode.species.url);
    
    if (id <= 151) {
      const found = allPokemon.find(p => p.id === id);
      if (found) {
        chain.push({
          id: found.id,
          name: found.name,
          types: found.types,
        });
      }
    }

    // Recursively process evolutions
    currentNode.evolves_to.forEach(traverse);
  }

  traverse(node);
  return chain;
}

/**
 * Extract Pokemon ID from a PokéAPI URL
 * Example: "https://pokeapi.co/api/v2/pokemon-species/25/" -> 25
 */
function extractIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}
