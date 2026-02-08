import { useEffect } from "react";

import { CardList } from "@/components/CardList";
import { Modal } from "@/components/Modal";
import { TypeFilter } from "@/components/TypeFilter";
import { ModalDetails } from "@/components/ModalDetails";
import { usePokemonStore } from "@/store";

export const App = () => {
  const fetch = usePokemonStore((store) => store.fetch);

  const pokemon = usePokemonStore((store) => store.pokemon);

  const loadingAll = usePokemonStore((store) => store.loading);
  const failureAll = usePokemonStore((store) => store.failure);

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
        <TypeFilter />
        <CardList pokemon={pokemon} loading={loadingAll} />
      </main>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <ModalDetails />
      </Modal>

      <footer></footer>
    </div>
  );
};

export default App;
