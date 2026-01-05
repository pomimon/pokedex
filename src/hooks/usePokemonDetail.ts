import { useState, useEffect } from "react";
import type { PokemonDetail, FetchState } from "../types/pokemon";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

//fetches detailed information about a specific Pokémon

export const usePokemonDetail = (
  pokemonId: string | number | null,
): FetchState<PokemonDetail> => {
  const [state, setState] = useState<FetchState<PokemonDetail>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!pokemonId) {
      setState({ loading: false, error: null, data: null });
      return;
    }

    let isMounted = true;

    const fetchPokemonDetail = async () => {
      try {
        setState({ loading: true, error: null, data: null });

        const response = await fetch(
          `${POKEAPI_BASE_URL}/pokemon/${pokemonId}`,
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = (await response.json()) as PokemonDetail;

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

    fetchPokemonDetail();

    return () => {
      isMounted = false;
    };
  }, [pokemonId]);

  return state;
};
