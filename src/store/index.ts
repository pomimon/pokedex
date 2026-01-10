import { create } from "zustand";

import { type PokemonInfo, PokemonType } from "@/types";

const DEFAULT_INFO: PokemonInfo = {
  id: 1,
  name: "bulbasaur",
  types: [PokemonType.Grass, PokemonType.Poison],
  height: 0,
  weight: 0,
};

type State = {
  // all info for first 151 pokemon
  pokemon: PokemonInfo[];
  // data for the currently selected pokemon
  current: PokemonInfo;
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
};

export const usePokemonStore = create<State & Actions>((set, get) => ({
  // State
  pokemon: [],
  current: DEFAULT_INFO,
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

    set({ modalOpen: true, current });
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

  fetch: async () => {
    const URL: string = "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0";

    if (get().pokemon.length > 0) {
      // ignore if already loaded
      return;
    }

    if (get().loadingAll) {
      // ignore if already loading
      return;
    }

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

        return {
          id: json.id,
          name: json.name,
          height: json.height,
          weight: json.weight,
          types,
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
