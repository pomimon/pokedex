import styles from "./style.module.css";
import type { PokemonInfo, PokemonType } from "@/types";
import { TypeBadge } from "@/components/TypeBadge";
import { formatId, getSpriteUrl, getPokeColor } from "@/utils";
import { usePokemonStore } from "@/store";
import { SpriteImage } from "@/components/SpriteImage";

type Props = Pick<PokemonInfo, "id" | "name" | "types">;

export const CardSummary = ({ id, name, types }: Props) => {
  const openModal = usePokemonStore((s) => s.openModal);
  const spriteUrl = getSpriteUrl(id);
  const badges = types.map((type) => <TypeBadge key={type} type={type} />);

  const { typeColorA, typeColorB } = getPokeColor(types);

  const containerStyles: React.CSSProperties = {
    ["--type-color-a" as any]: typeColorA,
    ["--type-color-b" as any]: typeColorB,
  };

  return (
    <div
      className={styles.card}
      style={containerStyles}
      onClick={() => openModal(id)}
    >
      <div className={styles.header}>
        <div className={styles.number}>{formatId(id)}</div>
      </div>
      <SpriteImage id={id} name={name} size={120} />
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.types}>{badges}</div>
    </div>
  );
};
