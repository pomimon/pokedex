// import { PokemonType } from "@/types";
// import { TypeBadge } from "@/components/TypeBadge";
// import { usePokemonStore } from "@/store";
// import styles from "./style.module.css";

// export const TypeFilter = () => {
//   const searchType = usePokemonStore((s) => s.searchType);
//   const toggleType = usePokemonStore((s) => s.toggleTypeFilter);
//   const clearFilters = usePokemonStore((s) => s.clearTypeFilters);

//   const allTypes = Object.values(PokemonType) as PokemonType[];

//   return (
//     <div className={styles.container}>
//       <p>Filter by type:</p>
//       <div className={styles.typeFilter}>
//         {allTypes.map((type) => {
//           const isActive = searchType === type;
//           const isDisabled = searchType !== null && !isActive;

//           return (
//             <div
//               key={type}
//               onClick={() => toggleType(type)}
//               className={[
//                 styles.typeButton,
//                 isActive && styles.active,
//                 isDisabled && styles.disabled,
//               ]
//                 .filter(Boolean)
//                 .join(" ")}
//             >
//               <TypeBadge type={type} format="button" />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };


import { useState } from "react";
import { PokemonType } from "@/types";
import { TypeBadge } from "@/components/TypeBadge";
import { usePokemonStore } from "@/store";
import styles from "./style.module.css";

export const TypeFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const searchType = usePokemonStore((s) => s.searchType);
  const toggleType = usePokemonStore((s) => s.toggleTypeFilter);
  const clearFilters = usePokemonStore((s) => s.clearTypeFilters);

  const allTypes = Object.values(PokemonType) as PokemonType[];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.toggleButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={styles.caret}>Filter by type {isOpen ? '▲' : '▼'}</div>
        </button>

        {searchType && (
          <button
            className={styles.clearButton}
            onClick={clearFilters}
          >
            Clear filter
          </button>
        )}
      </div>

      {isOpen && (
        <div className={styles.typeFilter}>
          {allTypes.map((type) => {
            const isActive = searchType === type;
            const isDisabled = searchType !== null && !isActive;

            return (
              <div
                key={type}
                onClick={() => toggleType(type)}
                className={[
                  styles.typeButton,
                  isActive && styles.active,
                  isDisabled && styles.disabled,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <TypeBadge type={type} format="button" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

