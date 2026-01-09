import styles from "./style.module.css";
import type { PokemonInfo, PokemonType } from "@/types";
import { TypeBadge } from "@/components/TypeBadge";
import { capitalize, formatId, getSpriteUrl } from "@/utils";

const PokeNumber = ({ id }: Pick<PokemonInfo, "id">) => {
  return <div className={styles.number}>{formatId(id)}</div>;
};

const PokeSprite = ({ id, name }: Pick<PokemonInfo, "id" | "name">) => {
  const spriteUrl = getSpriteUrl(id);

  return (
    <div className={styles.sprite}>
      <img src={spriteUrl} alt={name} loading="lazy" />
    </div>
  );
};

const PokeName = ({ name }: Pick<PokemonInfo, "name">) => {
  return <h3 className={styles.name}>{capitalize(name)}</h3>;
};

const PokeType = ({ types }: Pick<PokemonInfo, "types">) => {
  const badges = types.map((type) => <TypeBadge key={type} type={type} />);

  return <div className={styles.types}>{badges}</div>;
};

export const CardSummary = ({
  id,
  name,
  types,
}: Pick<PokemonInfo, "id" | "name" | "types">) => {
  return (
    <div className={styles.card}>
      <PokeNumber id={id} />
      <PokeSprite id={id} name={name} />
      <PokeName name={name} />
      <PokeType types={types} />
    </div>
  );
};
