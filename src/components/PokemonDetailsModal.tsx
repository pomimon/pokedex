import { useEffect, useMemo } from "react";
import { PokemonTypeBadge } from "./PokemonTypeBadge";
import { usePokemonSpecies, useEvolutionChain } from "../hooks";
import type { PokemonDetail, EvolutionChainLink } from "../types";

type PokemonDetailsModalProps = {
  pokemon: PokemonDetail | null;
  onClose: () => void;
  onPokemonClick: (pokemonName: string) => void;
};

export const PokemonDetailsModal = ({
  pokemon,
  onClose,
  onPokemonClick,
}: PokemonDetailsModalProps) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (pokemon) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [pokemon]);

  // Fetch species data (includes flavor text and evolution chain URL)
  const { data: speciesData } = usePokemonSpecies(pokemon?.species.url || null);

  // Fetch evolution chain data
  const { data: evolutionData } = useEvolutionChain(
    speciesData?.evolution_chain.url || null,
  );

  // Extract English flavor text
  const flavorText = useMemo(() => {
    if (!speciesData?.flavor_text_entries) return null;

    const englishEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === "en",
    );

    return englishEntry?.flavor_text.replace(/\f/g, " ") || null;
  }, [speciesData]);

  // Flatten evolution chain into array of species with name and ID
  const evolutionChain = useMemo(() => {
    if (!evolutionData) return [];

    const flattenChain = (
      chain: EvolutionChainLink,
    ): Array<{ name: string; id: number }> => {
      // Extract ID from species URL (format: https://pokeapi.co/api/v2/pokemon-species/{id}/)
      const idMatch = chain.species.url.match(/\/(\d+)\//);
      const id = idMatch && idMatch[1] ? parseInt(idMatch[1], 10) : 0;

      const result = [{ name: chain.species.name, id }];
      chain.evolves_to.forEach((evolution) => {
        result.push(...flattenChain(evolution));
      });
      return result;
    };

    return flattenChain(evolutionData.chain);
  }, [evolutionData]);

  if (!pokemon) {
    return null;
  }

  // Use animated GIF sprite
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEvolutionClick = (pokemonName: string) => {
    onPokemonClick(pokemonName);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-header">
          <h2 className="modal-pokemon-name">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <div className="modal-pokemon-number">
            #{pokemon.id.toString().padStart(3, "0")}
          </div>
        </div>

        <img
          src={spriteUrl}
          alt={pokemon.name}
          className="modal-pokemon-sprite"
        />

        <div className="modal-types">
          {pokemon.types.map((type) => (
            <PokemonTypeBadge key={type.slot} typeName={type.type.name} />
          ))}
        </div>

        {flavorText && (
          <div className="modal-flavor-text">
            <p>{flavorText}</p>
          </div>
        )}

        <div className="modal-stats">
          <div className="modal-stat">
            <span className="modal-stat-label">Height:</span>
            <span className="modal-stat-value">{pokemon.height / 10}m</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">Weight:</span>
            <span className="modal-stat-value">{pokemon.weight / 10}kg</span>
          </div>
          <div className="modal-stat">
            <span className="modal-stat-label">Base Experience:</span>
            <span className="modal-stat-value">{pokemon.base_experience}</span>
          </div>
        </div>

        {evolutionChain.length > 1 && (
          <div className="modal-evolutions">
            <h3 className="modal-evolutions-title">Evolution Chain</h3>
            <div className="modal-evolutions-list">
              {evolutionChain.map((evo) => {
                const evoSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${evo.id}.gif`;

                return (
                  <div key={evo.name} className="modal-evolution-item">
                    <div
                      className="modal-evolution-sprite-container"
                      onClick={() => handleEvolutionClick(evo.name)}
                    >
                      <img
                        src={evoSpriteUrl}
                        alt={evo.name}
                        className="modal-evolution-sprite"
                      />
                    </div>
                    <div className="modal-evolution-name">
                      {evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
