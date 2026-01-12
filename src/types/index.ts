export enum PokemonType {
  Normal = "normal",
  Fire = "fire",
  Water = "water",
  Electric = "electric",
  Grass = "grass",
  Ice = "ice",
  Fighting = "fighting",
  Poison = "poison",
  Ground = "ground",
  Flying = "flying",
  Psychic = "psychic",
  Bug = "bug",
  Rock = "rock",
  Ghost = "ghost",
  Dragon = "dragon",
  Dark = "dark",
  Steel = "steel",
  Fairy = "fairy",
}
export type Stat = {
  name: string;
  value: number;
};

export type PokemonInfo = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  stats: Stat[];
  flavourText: string | null;
};

export type Evolution = {
  id: number;
  name: string;
  types: PokemonType[];
};

export type EvolutionChain = Evolution[];
