import { useEffect } from "react";

import type { PokemonInfo } from "@/types";
import { capitalize, formatId, getPokeColor } from "@/utils";
import { TypeBadge } from "@/components/TypeBadge";
import { SpriteImage } from "@/components/SpriteImage";
import { usePokemonStore } from "@/store";
import styles from "./style.module.css";

export const ModalDetails = () => {
  const pokemon = usePokemonStore((s) => s.current);
  const next = usePokemonStore((s) => s.nextPokemon);
  const previous = usePokemonStore((s) => s.previousPokemon);

  const flavorText = usePokemonStore((s) => s.flavorText);
  const loadingSpecies = usePokemonStore((s) => s.loadingSpecies);

  const evolutions = usePokemonStore((s) => s.evolutions);
  const loadingEvolution = usePokemonStore((s) => s.loadingEvolution);
  const openModal = usePokemonStore((s) => s.openModal);

  const { typeColorA, typeColorB } = getPokeColor(pokemon.types);

  const containerStyles: React.CSSProperties = {
    ["--type-color-a" as any]: typeColorA,
    ["--type-color-b" as any]: typeColorB,
  };

  const STAT_NAMES: Record<string, string> = {
    "special-attack": "Special Attack",
    "special-defense": "Special Defense",
    hp: "HP",
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
        {loadingSpecies ? <p>Loading...</p> : <p>{flavorText}</p>}
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.label}>Height</span>
          <span className={styles.value}>{pokemon.height / 10}m</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.label}>Weight</span>
          <span className={styles.value}>{pokemon.weight / 10}kg</span>
        </div>

        {pokemon.stats.map((stat) => (
          <div key={stat.name} className={styles.stat}>
            <span className={styles.label}>
              {STAT_NAMES[stat.name] || capitalize(stat.name)}
            </span>
            <span className={styles.value}>{stat.value}</span>
          </div>
        ))}
      </div>

      {evolutions.length > 1 && (
        <div className={styles.evolutions}>
          <h3>Evolutions</h3>

          <div className={styles.evolutionList}>
            {evolutions.map((evo) => (
              <button
                key={evo.id}
                className={styles.evolution}
                onClick={() => openModal(evo.id)}
              >
                <SpriteImage id={evo.id} name={evo.name} size={80} />

                <span className={styles.evolutionName}>
                  {capitalize(evo.name)}
                </span>

                {/*<div className={styles.evolutionTypes}>
                  {evo.types.map((type) => (
                    <TypeBadge key={type} type={type} />
                  ))}
                </div>*/}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
