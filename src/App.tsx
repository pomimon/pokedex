import { useEffect } from "react";

import { CardList } from "@/components/CardList";
import { usePokemonStore } from "@/store";
import type { PokemonInfo } from "@/types";

export const App = () => {
  const fetch = usePokemonStore((store) => store.fetch);
  const pokemon = usePokemonStore((store) => store.pokemon);
  const loadingAll = usePokemonStore((store) => store.loadingAll);
  const failureAll = usePokemonStore((store) => store.failureAll);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (failureAll) {
    return (
      <div className="app">
        <header>
          <h1>Pokédex</h1>
        </header>
        <main>
          <div className="pokemon-list-state">
            <p>Error loading Pokémon: {failureAll}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Pokédex</h1>
      </header>

      <main>
        <CardList pokemon={pokemon} loading={loadingAll} />
      </main>
    </div>
  );
};

export default App;
