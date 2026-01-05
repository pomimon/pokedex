export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonSprites = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
    dream_world?: {
      front_default: string | null;
    };
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  sprites: PokemonSprites;
  types: PokemonType[];
  height: number;
  weight: number;
  base_experience: number;
  species: {
    name: string;
    url: string;
  };
};

/**
 * Pokémon Species Data
 * Contains flavor text and evolution chain information
 */
export type PokemonSpecies = {
  id: number;
  name: string;
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
};

/**
 * Evolution Chain Species
 * Represents a single Pokémon in the evolution chain
 */
export type EvolutionChainSpecies = {
  name: string;
  url: string;
};

/**
 * Evolution Chain Link
 * Represents one stage in the evolution chain
 */
export type EvolutionChainLink = {
  species: EvolutionChainSpecies;
  evolves_to: EvolutionChainLink[];
};

/**
 * Evolution Chain Data
 * Complete evolution chain from PokéAPI
 */
export type EvolutionChain = {
  id: number;
  chain: EvolutionChainLink;
};

export type FetchState<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};
