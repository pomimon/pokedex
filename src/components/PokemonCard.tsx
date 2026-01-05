import { PokemonTypeBadge } from "./PokemonTypeBadge";
import type { PokemonDetail } from "../types";

type PokemonCardProps = {
  pokemon: PokemonDetail;
  onClick: (pokemon: PokemonDetail) => void;
};

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const handleClick = () => {
    onClick(pokemon);
  };

  // Use animated GIF sprite
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`;

  return (
    <div className="pokemon-card" onClick={handleClick}>
      <div className="pokemon-card-number">
        #{pokemon.id.toString().padStart(3, "0")}
      </div>

      {spriteUrl && (
        <div className="pokemon-card-sprite">
          <img src={spriteUrl} alt={pokemon.name} />
        </div>
      )}

      <h3 className="pokemon-card-name">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </h3>

      <div className="pokemon-card-types">
        {pokemon.types.map((type) => (
          <PokemonTypeBadge key={type.slot} typeName={type.type.name} />
        ))}
      </div>
    </div>
  );
};
