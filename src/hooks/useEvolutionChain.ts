import { useState, useEffect } from 'react';
import type { EvolutionChain, FetchState } from '../types';

/**
 * Hook for fetching Pokémon evolution chain data
 * @param evolutionChainUrl - The URL to fetch evolution chain data from
 * @returns FetchState containing loading, error, and data states
 */
export const useEvolutionChain = (
  evolutionChainUrl: string | null
): FetchState<EvolutionChain> => {
  const [state, setState] = useState<FetchState<EvolutionChain>>({
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    if (!evolutionChainUrl) {
      setState({ loading: false, error: null, data: null });
      return;
    }

    let isMounted = true;

    const fetchEvolutionChain = async () => {
      try {
        setState({ loading: true, error: null, data: null });

        const response = await fetch(evolutionChainUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as EvolutionChain;

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

    fetchEvolutionChain();

    return () => {
      isMounted = false;
    };
  }, [evolutionChainUrl]);

  return state;
};
