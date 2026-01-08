import { PokemonTypeBadge } from "./PokemonTypeBadge";
import type { PokemonDetail } from "../types";
import { getSpriteUrl, formatId, formatName } from "../utils";

type PokemonCardProps = {
  pokemon: PokemonDetail;
  onClick: (pokemon: PokemonDetail) => void;
};

export const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
  const handleClick = () => {
    onClick(pokemon);
  };

  // Use animated GIF sprite
  const spriteUrl = getSpriteUrl(pokemon.id);

  return (
    <div className="pokemon-card" onClick={handleClick}>
      <div className="pokemon-card-number">{formatId(pokemon.id)}</div>

      {spriteUrl && (
        <div className="pokemon-card-sprite">
          <img src={spriteUrl} alt={pokemon.name} loading="lazy" />
        </div>
      )}

      <h3 className="pokemon-card-name">{formatName(pokemon.name)}</h3>

      <div className="pokemon-card-types">
        {pokemon.types.map((type) => (
          <PokemonTypeBadge key={type.slot} typeName={type.type.name} />
        ))}
      </div>
    </div>
  );
};
