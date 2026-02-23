import { usePokemonStore } from "@/store";
import styles from "./style.module.css";
import pokeball from "@/Assets/pokeball.png"

export const SearchBar = () => {
  const searchQuery = usePokemonStore((s) => s.searchQuery);
  const setSearchQuery = usePokemonStore((s) => s.setSearchQuery);

  return (
    <div className={styles.container}>
      <img src ={pokeball} alt="pokeball" className={styles.icon}/>
      <input
        type="text"
        className={styles.input}
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <button
          className={styles.clearButton}
          onClick={() => setSearchQuery("")}
        >
          ✕
        </button>
      )}
    </div>
  );
};
