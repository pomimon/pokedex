import { useState, useEffect } from "react";
import type { PokemonListResponse, FetchState } from "../types/pokemon";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

// fetches the list of Pokémon

export const usePokemonList = (
  limit: number = 151,
  offset: number = 0,
): FetchState<PokemonListResponse> => {
  const [state, setState] = useState<FetchState<PokemonListResponse>>({
    loading: true,
    error: null,
    data: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchPokemonList = async () => {
      try {
        setState({ loading: true, error: null, data: null });

        const response = await fetch(
          `${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as PokemonListResponse;

        if (isMounted) {
          setState({ loading: false, error: null, data });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            loading: false,
            error: err instanceof Error ? err : new Error("Unknown error"),
            data: null,
          });
        }
      }
    };

    fetchPokemonList();

    return () => {
      isMounted = false;
    };
  }, [limit, offset]);

  return state;
};
