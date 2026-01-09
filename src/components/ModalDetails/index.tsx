import type { PokemonInfo } from "@/types";
import { capitalize, formatId, getSpriteUrl } from "@/utils";
import { TypeBadge } from "@/components/TypeBadge";

type ModalProps = {
  pokemon: PokemonInfo;
};

export const ModalDetails = ({ pokemon }: ModalProps) => {
  console.log("ModalDetails", pokemon);

  const spriteUrl = getSpriteUrl(pokemon.id);

  return (
    <div>
      <div className="modal-header">
        <h2 className="modal-pokemon-name">{capitalize(pokemon.name)}</h2>
        <div className="modal-pokemon-number">{formatId(pokemon.id)}</div>
      </div>

      <img
        src={spriteUrl}
        alt={pokemon.name}
        className="modal-pokemon-sprite"
      />

      <div className="modal-types">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

      <div className="modal-flavor-text">
        <p>TODO: Get Fabulous</p>
      </div>

      <div className="modal-stats">
        <div className="modal-stat">
          <span className="modal-stat-label">Height:</span>
          <span className="modal-stat-value">{pokemon.height / 10}m</span>
        </div>
        <div className="modal-stat">
          <span className="modal-stat-label">Weight:</span>
          <span className="modal-stat-value">{pokemon.weight / 10}kg</span>
        </div>
      </div>
    </div>
  );
};
