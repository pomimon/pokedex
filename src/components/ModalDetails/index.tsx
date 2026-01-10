import type { PokemonInfo } from "@/types";
import { capitalize, formatId } from "@/utils";
import { TypeBadge } from "@/components/TypeBadge";
import { SpriteImage } from "@/components/SpriteImage";
import { usePokemonStore } from "@/store";
import styles from "./style.module.css";

type ModalProps = {
  pokemon: PokemonInfo;
};

export const ModalDetails = ({ pokemon }: ModalProps) => {
  console.log("ModalDetails", pokemon);
  const next = usePokemonStore((s) => s.nextPokemon);
  const previous = usePokemonStore((s) => s.previousPokemon);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.navigation}>
          <button onClick={previous}>←</button>
          <h2 className={styles.name}>{capitalize(pokemon.name)}</h2>
          <button onClick={next}>→</button>
        </div>
        <div className={styles.number}>{formatId(pokemon.id)}</div>
      </div>

      <SpriteImage id={pokemon.id} name={pokemon.name} size={250} />

      <div className={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

      <div className={styles.flavorText}>
        <p>TODO: Get Fabulous</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>Height:</span>
          <span className={styles.value}>{pokemon.height / 10}m</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.label}>Weight:</span>
          <span className={styles.value}>{pokemon.weight / 10}kg</span>
        </div>
      </div>
    </div>
  );
};
