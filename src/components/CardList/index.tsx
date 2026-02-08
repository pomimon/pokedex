import styles from "./style.module.css";
import type { PokemonInfo } from "@/types";
import { CardSummary } from "@/components/CardSummary";
import pokeball from "@/Assets/pokeball.png";
import { usePokemonStore } from "@/store";

type CardProps = {
  pokemon: PokemonInfo[];
  loading: boolean;
};

export const CardList = ({ pokemon, loading }: CardProps) => {
  const searchType = usePokemonStore((s) => s.searchType);
  const searchQuery = usePokemonStore((s) => s.searchQuery);

  // Filter by type first
  let filteredPokemon =
    searchType === null
      ? pokemon
      : pokemon.filter((p) => p.types.includes(searchType));

  // Then filter by search query
  if (searchQuery) {
    filteredPokemon = filteredPokemon.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (loading) {
    return (
      <div className={styles.info}>
        <p>Loading Pokédex...</p>
        <img src={pokeball} alt="pokeball" />
      </div>
    );
  }

  if (filteredPokemon.length === 0) {
    return (
      <div className={styles.info}>
        <p>No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {filteredPokemon.map((p) => (
        <CardSummary key={p.id} id={p.id} name={p.name} types={p.types} />
      ))}
    </div>
  );
};
