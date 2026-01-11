import styles from "./style.module.css";
import type { PokemonInfo } from "@/types";
import { CardSummary } from "@/components/CardSummary";
import pokeball from "@/Assets/pokeball.png";

type CardProps = {
  pokemon: PokemonInfo[];
  loading: boolean;
};

export const CardList = ({ pokemon, loading }: CardProps) => {
  if (loading) {
    return (
      <div className={styles.info}>
        <p>Loading Pokédex...</p>
        <img src={pokeball} alt="pokeball" />
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className={styles.info}>
        <p>No Pokémon found.</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {pokemon.map((p) => (
        <CardSummary key={p.id} id={p.id} name={p.name} types={p.types} />
      ))}
    </div>
  );
};
