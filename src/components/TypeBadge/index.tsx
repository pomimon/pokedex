import styles from "./style.module.css";
import { getTypeColor } from "@/utils";
import { PokemonType } from "@/types";

type TypeBadgeFormat = "button" | "pill";

type TypeBadgeProps = {
  type: PokemonType;
  format?: TypeBadgeFormat;
};

export const TypeBadge = ({ type, format = "pill" }: TypeBadgeProps) => {
  const backgroundColor = getTypeColor(type);
  const className = [styles.badge, styles[format]];

  return (
    <span className={className.join(" ")} style={{ backgroundColor }}>
      {type}
    </span>
  );
};
