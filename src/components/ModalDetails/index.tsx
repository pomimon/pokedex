import { useEffect } from "react";

import type { PokemonInfo } from "@/types";
import { capitalize, formatId, getPokeColor } from "@/utils";
import { TypeBadge } from "@/components/TypeBadge";
import { SpriteImage } from "@/components/SpriteImage";
import { usePokemonStore } from "@/store";
import styles from "./style.module.css";

type ModalProps = {
  pokemon: PokemonInfo;
};

export const ModalDetails = ({ pokemon }: ModalProps) => {
  const next = usePokemonStore((s) => s.nextPokemon);
  const previous = usePokemonStore((s) => s.previousPokemon);
  const flavorText = usePokemonStore((s) => s.flavorText);
  const loadingSpecies = usePokemonStore((s) => s.loadingSpecies);
  const fetchSpecies = usePokemonStore((s) => s.fetchSpecies);

  useEffect(() => {
    fetchSpecies(pokemon.id);
  }, [pokemon.id, fetchSpecies]);

  const { typeColorA, typeColorB } = getPokeColor(pokemon.types);

  const containerStyles: React.CSSProperties = {
    ["--type-color-a" as any]: typeColorA,
    ["--type-color-b" as any]: typeColorB,
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <div className={styles.header}>
        <h2 className={styles.name}>{capitalize(pokemon.name)}</h2>
        <div className={styles.number}>{formatId(pokemon.id)}</div>
      </div>

      <div className={styles.navigation}>
        <button onClick={previous}>
          <div className={styles.chevronLeft} />
        </button>
        <SpriteImage id={pokemon.id} name={pokemon.name} size={250} />
        <button onClick={next}>
          <div className={styles.chevronRight} />
        </button>
      </div>

      <div className={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

      <div className={styles.flavorText}>
        {loadingSpecies ? <p>Loading…</p> : <p>{flavorText}</p>}
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

        {pokemon.stats.map((stat) => (
          <div key={stat.name} className={styles.stat}>
            <span className={styles.label}>{capitalize(stat.name)}:</span>
            <span className={styles.value}>{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
