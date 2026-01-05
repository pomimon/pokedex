import { useState, useEffect } from "react";
import { usePokemonList } from "./hooks";
import { PokemonList } from "./components/PokemonList";
import { PokemonDetailsModal } from "./components/PokemonDetailsModal";
import type { PokemonDetail } from "./types";

export const App = () => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  const {
    data: pokemonList,
    loading: listLoading,
    error: listError,
  } = usePokemonList(151, 0);

  // Fetch all Pokémon details when the list is loaded
  useEffect(() => {
    if (!pokemonList?.results) return;

    const fetchAllPokemon = async () => {
      setLoading(true);
      try {
        const fetchPromises = pokemonList.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${pokemon.name}`);
          }
          return response.json() as Promise<PokemonDetail>;
        });

        const allPokemon = await Promise.all(fetchPromises);
        setPokemonDetails(allPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, [pokemonList]);

  const handlePokemonClick = (pokemon: PokemonDetail) => {
    setSelectedPokemon(pokemon);
  };

  const handlePokemonClickByName = (pokemonName: string) => {
    const pokemon = pokemonDetails.find((p) => p.name === pokemonName);
    if (pokemon) {
      setSelectedPokemon(pokemon);
    }
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  if (listError) {
    return (
      <div className="app">
        <header>
          <h1>Pokédex</h1>
        </header>
        <main>
          <div className="pokemon-list-state">
            <p>Error loading Pokémon: {listError.message}</p>
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
        <PokemonList
          pokemon={pokemonDetails}
          loading={listLoading || loading}
          onPokemonClick={handlePokemonClick}
        />
      </main>
      <PokemonDetailsModal
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
        onPokemonClick={handlePokemonClickByName}
      />
    </div>
  );
};

export default App;
