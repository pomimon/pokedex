/**
 * Pokemon Store
 *
 * Zustand store for managing Pokemon state.
 *
 * KEY IMPROVEMENTS:
 * - Separated API calls into api/ layer
 * - Separated business logic into lib/ layer
 * - Store now only manages state and coordinates actions
 * - Cleaner separation of concerns makes testing easier
 * - Better error handling with specific error states
 */

import { create } from "zustand";
import { type PokemonInfo, PokemonType, type EvolutionChain } from "@/types";
import { pokemonApi, speciesApi, evolutionApi } from "@/api";
import { transformPokemonData, extractFlavorText, buildEvolutionChain } from "@/lib";

const DEFAULT_INFO: PokemonInfo = {
  id: 1,
  name: "bulbasaur",
  types: [PokemonType.Grass, PokemonType.Poison],
  height: 0,
  weight: 0,
  flavourText: null,
  stats: [],
};

type State = {
  // All Pokemon data (first 151)
  pokemon: PokemonInfo[];

  // Currently selected Pokemon in modal
  current: PokemonInfo;

  // Additional data loaded on-demand
  flavorText: string | null;
  evolutions: EvolutionChain;

  // Filters
  searchType: PokemonType | null;
  searchQuery: string;

  // UI state
  modalOpen: boolean;

  // Loading states - separated for better UX
  loadingAll: boolean;      // Loading initial 151 Pokemon
  loadingDetails: boolean;   // Loading species/evolution data

  // Error states
  failureAll: string | null;
  failureDetails: string | null;
};

type Actions = {
  // Initial data load
  loadAllPokemon: () => Promise<void>;

  // Modal controls
  openModal: (id: number) => void;
  closeModal: () => void;

  // Navigation within modal
  navigate: (direction: 'next' | 'prev') => void;

  // Filters
  toggleTypeFilter: (type: PokemonType) => void;
  clearTypeFilters: () => void;
  setSearchQuery: (query: string) => void;
};

export const usePokemonStore = create<State & Actions>((set, get) => ({
  // ===== STATE =====
  pokemon: [],
  current: DEFAULT_INFO,
  flavorText: null,
  evolutions: [],
  searchType: null,
  searchQuery: '',
  modalOpen: false,
  loadingAll: false,
  loadingDetails: false,
  failureAll: null,
  failureDetails: null,

  // ===== ACTIONS =====

  /**
   * Load all 151 Pokemon on app start
   * Only runs once - subsequent calls are ignored
   */
  loadAllPokemon: async () => {
    // Don't reload if we already have data
    if (get().pokemon.length > 0) return;

    // Don't start a new load if one is in progress
    if (get().loadingAll) return;

    set({ loadingAll: true, failureAll: null });

    try {
      const rawData = await pokemonApi.fetchAll();
      const pokemon = rawData.map(transformPokemonData);
      set({ pokemon, current: pokemon[0] });
    } catch (error) {
      console.error('Failed to load Pokemon:', error);
      set({ failureAll: 'Failed to load Pokémon data. Please refresh the page.' });
    } finally {
      set({ loadingAll: false });
    }
  },

  /**
   * Open modal and load additional data for a Pokemon
   */
  openModal: async (id: number) => {
    const pokemon = get().pokemon.find(p => p.id === id);
    if (!pokemon) return;

    // Open modal immediately with cached data
    set({
      modalOpen: true,
      current: pokemon,
      flavorText: null,
      evolutions: [],
      failureDetails: null,
    });

    // Load additional data in the background
    set({ loadingDetails: true });

    try {
      // Fetch species and evolution data in parallel
      const speciesData = await speciesApi.fetchSpecies(id);
      const flavorText = extractFlavorText(speciesData);

      const evolutionData = await evolutionApi.fetchEvolutionChain(
        speciesData.evolution_chain.url
      );
      const evolutions = buildEvolutionChain(evolutionData.chain, get().pokemon);

      set({ flavorText, evolutions });
    } catch (error) {
      console.error('Failed to load Pokemon details:', error);
      set({ failureDetails: 'Failed to load additional details' });
    } finally {
      set({ loadingDetails: false });
    }
  },

  /**
   * Close the modal
   */
  closeModal: () => set({ modalOpen: false }),

  /**
   * Navigate to next or previous Pokemon
   * Wraps around at boundaries (after #151 goes to #1, and vice versa)
   */
  navigate: (direction) => {
    const { pokemon, current } = get();
    if (pokemon.length === 0) return;

    const currentIndex = pokemon.findIndex(p => p.id === current.id);

    let nextIndex: number;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % pokemon.length;
    } else {
      nextIndex = (currentIndex - 1 + pokemon.length) % pokemon.length;
    }

    const nextPokemon = pokemon[nextIndex];
    get().openModal(nextPokemon.id);
  },

  /**
   * Toggle a type filter on/off
   * Only one type can be active at a time (single-select)
   */
  toggleTypeFilter: (type: PokemonType) =>
    set((state) => ({
      searchType: state.searchType === type ? null : type,
    })),

  /**
   * Clear all type filters
   */
  clearTypeFilters: () => set({ searchType: null }),

  /**
   * Set the search query
   */
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}));
