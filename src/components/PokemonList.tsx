import { PokemonCard } from './PokemonCard';
import type { PokemonDetail } from '../types';

type PokemonListProps = {
  pokemon: PokemonDetail[];
  loading: boolean;
  onPokemonClick: (pokemon: PokemonDetail) => void;
};

export const PokemonList = ({ pokemon, loading, onPokemonClick }: PokemonListProps) => {
  if (loading) {
    return (
      <div className="pokemon-list-state">
        <p>Loading Pokédex...</p>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="pokemon-list-state">
        <p>No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} onClick={onPokemonClick} />
      ))}
    </div>
  );
};
