import { useEffect } from "react";

import type { PokemonInfo } from "@/types";
import { capitalize, formatId, getPokeColor } from "@/lib";
import { TypeBadge } from "@/components/TypeBadge";
import { SpriteImage } from "@/components/SpriteImage";
import { usePokemonStore } from "@/store";
import styles from "./style.module.css";

export const ModalDetails = () => {
  const pokemon = usePokemonStore((s) => s.current);
  const navigate = usePokemonStore((s) => s.navigate);

  const flavorText = usePokemonStore((s) => s.flavorText);
  const loadingDetails = usePokemonStore((s) => s.loadingDetails);

  const evolutions = usePokemonStore((s) => s.evolutions);
  const openModal = usePokemonStore((s) => s.openModal);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigate('prev');
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigate('next');
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

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
        <h2 id="modal-title" className={styles.name}>
          {capitalize(pokemon.name)}
        </h2>
        <div className={styles.number}>{formatId(pokemon.id)}</div>
      </div>

      <div className={styles.navigation}>
        <button
          onClick={() => navigate('prev')}
          title="Previous Pokémon"
        >
          <div className={styles.chevronLeft} />
        </button>
        <SpriteImage id={pokemon.id} name={pokemon.name} size={250} />
        <button
          onClick={() => navigate('next')}
          title="Next Pokémon"
        >
          <div className={styles.chevronRight} />
        </button>
      </div>

      <div className={styles.types}>
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

      <div className={styles.flavorText}>
        {loadingDetails ? <p>Loading...</p> : <p>{flavorText}</p>}
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

      {(loadingDetails || evolutions.length > 1) && (
        <div className={styles.evolutions}>
          <h3>Evolutions</h3>

          {loadingDetails ? (
            <p>Loading evolutions...</p>
          ) : (
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
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
