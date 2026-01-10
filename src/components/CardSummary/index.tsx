import styles from "./style.module.css";
import type { PokemonInfo, PokemonType } from "@/types";
import { TypeBadge } from "@/components/TypeBadge";
import { capitalize, formatId, getSpriteUrl } from "@/utils";
import { usePokemonStore } from "@/store";
import { SpriteImage } from "@/components/SpriteImage";

type Props = Pick<PokemonInfo, "id" | "name" | "types">;

export const CardSummary = ({ id, name, types }: Props) => {
  const openModal = usePokemonStore((s) => s.openModal);
  const spriteUrl = getSpriteUrl(id);
  const badges = types.map((type) => <TypeBadge key={type} type={type} />);

  return (
    <div className={styles.card} onClick={() => openModal(id)}>
      <div className={styles.number}>{formatId(id)}</div>
      <SpriteImage id={id} name={name} size={120} />
      <h3 className={styles.name}>{capitalize(name)}</h3>
      <div className={styles.types}>{badges}</div>
    </div>
  );
};
