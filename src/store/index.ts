import { create } from "zustand";

import { type PokemonInfo, PokemonType } from "@/types";

const DEFAULT_INFO: PokemonInfo = {
  id: 1,
  name: "bulbasaur",
  types: [PokemonType.Grass, PokemonType.Poison],
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
};

type Actions = {
  // - 1 request to fetch list of pokemon
  // - 151 requests to fetch initial pokemon info
  // - 151 requests to fetch pokemon image
  // - 1 request per-pokemon to fetch species info
  // - 1 request per-pokemon to fetch evolution info
  fetch: () => Promise<void>;
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

  // Actions
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
