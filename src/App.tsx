import { useEffect } from "react";

import { CardList } from "@/components/CardList";
import { Modal } from "@/components/Modal";
import { ModalDetails } from "@/components/ModalDetails";
import { usePokemonStore } from "@/store";
import type { PokemonInfo } from "@/types";

export const App = () => {
  const fetch = usePokemonStore((store) => store.fetch);

  const current = usePokemonStore((store) => store.current);
  const pokemon = usePokemonStore((store) => store.pokemon);

  const loadingAll = usePokemonStore((store) => store.loadingAll);
  const failureAll = usePokemonStore((store) => store.failureAll);

  const modalOpen = usePokemonStore((store) => store.modalOpen);
  const closeModal = usePokemonStore((store) => store.closeModal);

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

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalDetails pokemon={current} />
      </Modal>
    </div>
  );
};

export default App;
