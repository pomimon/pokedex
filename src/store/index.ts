import { create } from "zustand";

import { type PokemonInfo, PokemonType } from "@/types";

const DEFAULT_INFO: PokemonInfo = {
  id: 1,
  name: "bulbasaur",
  types: [PokemonType.Grass, PokemonType.Poison],
  height: 0,
  weight: 0,
  stats: [],
};

type State = {
  // all info for first 151 pokemon
  pokemon: PokemonInfo[];
  // data for the currently selected pokemon
  current: PokemonInfo;
  // flavor text for the currently selected pokemon
  flavorText: string | null;
  // loading species info text for the currently selected pokemon
  loadingSpecies: boolean;
  // error messsage for loading species
  failureSpecies: string | null;
  // list of types the user selected
  searchTypes: PokemonType[];
  // search term provided by the user
  searchQuery: string;
  // true when loading all pokemon info
  loadingAll: boolean;
  failureAll: string | null;
  // true when loading one pokemon info
  loadingOne: boolean;
  failureOne: string | null;
  modalOpen: boolean;
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
};

export const usePokemonStore = create<State & Actions>((set, get) => ({
  // State
  pokemon: [],
  current: DEFAULT_INFO,
  flavorText: null,
  loadingSpecies: false,
  failureSpecies: null,
  searchTypes: [],
  searchQuery: "",
  loadingAll: false,
  failureAll: null,
  loadingOne: false,
  failureOne: null,
  modalOpen: false,

  // Actions
  openModal: (id: number) => {
    const pokemon = get().pokemon.find((p) => p.id === id);
    const current = pokemon || DEFAULT_INFO;

    set({ modalOpen: true, current, flavorText: null });
  },

  closeModal: () => set({ modalOpen: false }),

  nextPokemon: () => {
    const { pokemon, current } = get();
    if (pokemon.length === 0) return;

    const total = pokemon.length;
    const nextId = current.id === total ? 1 : current.id + 1;

    set({ current: pokemon[nextId - 1] });
  },

  previousPokemon: () => {
    const { pokemon, current } = get();
    if (pokemon.length === 0) return;

    const total = pokemon.length;
    const prevId = current.id === 1 ? total : current.id - 1;

    set({ current: pokemon[prevId - 1] });
  },

  fetchSpecies: async (pokemonId: number) => {
    if (get().loadingSpecies) return;

    set({ loadingSpecies: true, failureSpecies: null });

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`,
      );
      const json = await response.json();

      const entry = json.flavor_text_entries.find(
        (e: any) => e.language.name === "en",
      );

      const flavorText = entry ? entry.flavor_text.replace(/\f/g, " ") : null;

      set({ flavorText });
    } catch (error) {
      console.error(error);
      set({ failureSpecies: "Failed to load species data" });
    } finally {
      set({ loadingSpecies: false });
    }
  },

  fetch: async () => {
    const URL: string = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

    if (get().pokemon.length > 0) return;
    if (get().loadingAll) return;

    set({ loadingAll: true, failureAll: null });

    try {
      const response = await fetch(URL);
      const json = await response.json();
      const data = json.results;

      const promises = data.map(async (pokemon: { url: string }) => {
        const response = await fetch(pokemon.url);
        const json = await response.json();

        const types = json.types.map((type: { type: { name: string } }) => {
          return type.type.name as keyof typeof PokemonType;
        });

        // Add base stats
        const stats = json.stats.map((stat: any) => ({
          name: stat.stat.name, // gets hp, attack, defense, etc
          value: stat.base_stat,
        }));

        return {
          id: json.id,
          name: json.name,
          height: json.height,
          weight: json.weight,
          types,
          base_experience: json.base_experience,
          stats,
        };
      });

      const pokemon = await Promise.all(promises);
      const current = pokemon[0];

      set({ current, pokemon });
    } catch (error) {
      console.error(error);
      set({ failureAll: "Failed to load Pokémon" });
    } finally {
      set({ loadingAll: false });
    }
  },
}));
