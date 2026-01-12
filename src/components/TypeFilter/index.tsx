import { PokemonType } from "@/types";
import { TypeBadge } from "@/components/TypeBadge";
import { usePokemonStore } from "@/store";
import styles from "./style.module.css";

export const TypeFilter = () => {
  const searchTypes = usePokemonStore((s) => s.searchTypes);
  const toggleType = usePokemonStore((s) => s.toggleTypeFilter);
  const clearFilters = usePokemonStore((s) => s.clearTypeFilters);

  const allTypes = Object.values(PokemonType);

  return (
    <div className={styles.typeFilter}>
      {allTypes.map((type) => {
        const isActive = searchTypes.includes(type);
        return (
          <div
            key={type}
            onClick={() => toggleType(type)}
            className={`${styles.typeButton} ${isActive ? styles.active : ""}`}
          >
            <TypeBadge type={type} />
          </div>
        );
      })}

      {searchTypes.length > 0 && (
        <div onClick={clearFilters} className={styles.clearButton}>
          Clear Filters
        </div>
      )}
    </div>
  );
};
