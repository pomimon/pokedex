import { useState, useEffect } from 'react';
import type { PokemonSpecies, FetchState } from '../types';

/**
 * Hook for fetching Pokémon species data including flavor text
 * @param speciesUrl - The URL to fetch species data from
 * @returns FetchState containing loading, error, and data states
 */
export const usePokemonSpecies = (
  speciesUrl: string | null
): FetchState<PokemonSpecies> => {
  const [state, setState] = useState<FetchState<PokemonSpecies>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!speciesUrl) {
      setState({ loading: false, error: null, data: null });
      return;
    }

    let isMounted = true;

    const fetchSpecies = async () => {
      try {
        setState({ loading: true, error: null, data: null });

        const response = await fetch(speciesUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as PokemonSpecies;

        if (isMounted) {
          setState({ loading: false, error: null, data });
        }
      } catch (err) {
        if (isMounted) {
          setState({
            loading: false,
            error: err instanceof Error ? err : new Error('Unknown error'),
            data: null,
          });
        }
      }
    };

    fetchSpecies();

    return () => {
      isMounted = false;
    };
  }, [speciesUrl]);

  return state;
};
