/**
 * Pokemon Utilities
 * 
 * Functions specific to Pokemon logic (colors, sprites, type effectiveness, etc.)
 */

import { PokemonType } from '@/types';
import { TYPE_COLORS } from '@/consts/colors';
import { IMAGE_URLS } from "@/consts/urls";

/**
 * Get sprite URL for a Pokemon
 * Uses the official artwork from PokeAPI
 */
export function getSpriteUrl(id: number): string {
  return `${IMAGE_URLS.gif}/${id}.gif`;
}

/**
 * Get the color hex code for a Pokemon type
 */
export function getTypeColor(type: PokemonType): string {
  return TYPE_COLORS[type] || '#A8A878';
}

/**
 * Get gradient colors for a Pokemon based on its types
 * Single type: both colors are the same
 * Dual type: typeColorA is primary, typeColorB is secondary
 */
export function getPokeColor(types: PokemonType[]): {
  typeColorA: string;
  typeColorB: string;
} {
  const typeColorA = getTypeColor(types[0]);
  const typeColorB = types.length > 1 ? getTypeColor(types[1]) : typeColorA;
  
  return { typeColorA, typeColorB };
}
