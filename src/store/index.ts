import { create } from "zustand";

import { type PokemonInfo, PokemonType, type EvolutionChain } from "@/types";
import { fetchAllPokemon } from "@/utils/fetchAllPokemon";
import { fetchSpeciesData } from "@/utils/fetchSpeciesData";
import { getFlavorText } from "@/utils/getFlavorText";

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
  // all info for first 151 pokemon
  pokemon: PokemonInfo[];
  // data for the currently selected pokemon
  current: PokemonInfo;
  // flavor text for the currently selected pokemon
  flavorText: string | null;

  evolutions: EvolutionChain;

  // list of types the user selected
  searchType: PokemonType | null;
  // search term provided by the user
  searchQuery: string;

  modalOpen: boolean;

  loading: boolean;
  failure: string | null;
};

type Actions = {
  // - 1 request to fetch list of pokemon
  // - 151 requests to fetch initial pokemon info
  // - 151 requests to fetch pokemon image
  // - 1 request per-pokemon to fetch species info
  // - 1 request per-pokemon to fetch evolution info
  fetch: () => Promise<void>;
  openModal: (current: number) => void;
  closeModal: () => void;
  nextPokemon: () => void;
  previousPokemon: () => void;
  fetchSpecies: (pokemonId: number) => Promise<void>;
  fetchEvolution: (pokemonId: number) => Promise<void>;
  toggleTypeFilter: (type: PokemonType) => void;
  clearTypeFilters: () => void;
};

export const usePokemonStore = create<State & Actions>((set, get) => ({
  // State
  pokemon: [],
  current: DEFAULT_INFO,
  flavorText: null,
  evolutions: [],
  failureEvolution: null,
  searchType: null,
  searchQuery: "",
  loading: false,
  failure: null,
  modalOpen: false,

  // Actions
  //
  toggleTypeFilter: (type: PokemonType) =>
    set((state) => ({
      searchType: state.searchType === type ? null : type,
    })),

  clearTypeFilters: () => set({ searchType: null }),

  openModal: (id: number) => {
    const pokemon = get().pokemon.find((p) => p.id === id);
    const current = pokemon || DEFAULT_INFO;

    set({
      modalOpen: true,
      current,
      flavorText: null,
      evolutions: [],
    });
    get().fetchSpecies(id);
    get().fetchEvolution(id);
  },

  closeModal: () => set({ modalOpen: false }),

  nextPokemon: () => {
    const { pokemon, current } = get();
    if (pokemon.length === 0) return;

    const total = pokemon.length;
    const nextId = current.id === total ? 1 : current.id + 1;

    const next = pokemon[nextId - 1];

    set({ current: next, flavorText: null, evolutions: [] });

    get().fetchSpecies(next.id);
    get().fetchEvolution(next.id);
  },

  previousPokemon: () => {
    const { pokemon, current } = get();
    if (pokemon.length === 0) return;

    const total = pokemon.length;
    const prevId = current.id === 1 ? total : current.id - 1;
    const prev = pokemon[prevId - 1];

    set({ current: prev, flavorText: null, evolutions: [] });

    get().fetchSpecies(prev.id);
    get().fetchEvolution(prev.id);
  },

  fetchSpecies: async (pokemonId: number) => {
    if (get().loading) return;

    set({ loading: true, failure: null });

    try {
      const speciesData = await fetchSpeciesData(pokemonId);
      const flavorText = getFlavorText(speciesData);
      set({ flavorText });
    } catch (error) {
      console.error(error);
      set({ failure: "Failed to load species data" });
    } finally {
      set({ loading: false });
    }
  },

  fetchEvolution: async (pokemonId: number) => {
    set({ loading: true, failure: null, evolutions: [] });

    try {
      // 1. species
      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`,
      );
      const speciesJson = await speciesRes.json();

      // 2. evolution chain
      const evoRes = await fetch(speciesJson.evolution_chain.url);
      const evoJson = await evoRes.json();

      // 3. flatten chain
      const evolutions: EvolutionChain = [];
      const allPokemon = get().pokemon;

      const limitPokemon = (node: any) => {
        const urlParts = node.species.url.split("/").filter(Boolean);
        const id = Number(urlParts[urlParts.length - 1]);

        // Only include first 151 Pokémon
        if (id <= 151) {
          const found = allPokemon.find((p) => p.id === id);
          if (found) {
            evolutions.push({
              id: found.id,
              name: found.name,
              types: found.types,
            });
          }
        }

        node.evolves_to.forEach(limitPokemon);
      };

      limitPokemon(evoJson.chain);

      set({ evolutions });
    } catch (err) {
      console.error(err);
      set({ failure: "Failed to load evolution data" });
    } finally {
      set({ loading: false });
    }
  },

  fetch: async () => {
    if (get().pokemon.length > 0) return;
    if (get().loading) return;

    set({ loading: true, failure: null });

    try {
      const pokemon = await fetchAllPokemon();
      const current = pokemon[0];
      set({ current, pokemon });
    } catch (error) {
      console.error(error);
      set({ failure: "Failed to load Pokémon" });
    } finally {
      set({ loading: false });
    }
  },
}));
