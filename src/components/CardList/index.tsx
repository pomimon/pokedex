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
  const searchTypes = usePokemonStore((s) => s.searchTypes);

  const filteredPokemon = pokemon.filter((p) =>
    searchTypes.length === 0
      ? true
      : searchTypes.every((type) => p.types.includes(type)),
  );

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
