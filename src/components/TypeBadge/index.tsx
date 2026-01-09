import styles from "./style.module.css";
import { getTypeColor } from "@/utils";
import { PokemonType } from "@/types";

type TypeBadgeProps = {
  type: PokemonType;
};

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const backgroundColor = getTypeColor(type);

  return (
    <span className={styles.badge} style={{ backgroundColor }}>
      {type}
    </span>
  );
};
