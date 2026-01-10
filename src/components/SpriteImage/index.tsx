import { getSpriteUrl } from "@/utils";
import styles from "./style.module.css";
import type { PokemonInfo } from "@/types";

type ImageProps = {
  id: PokemonInfo["id"];
  name: string;
  size?: number;
  className?: string;
};

export const SpriteImage = ({
  id,
  name,
  size = 120,
  className,
}: ImageProps) => {
  const spriteUrl = getSpriteUrl(id);

  return (
    <div
      className={`${styles.sprite} ${className ?? ""}`}
      style={{ ["--sprite-size" as any]: `${size}px` }}
    >
      <img src={spriteUrl} alt={name} loading="lazy" />
    </div>
  );
};
