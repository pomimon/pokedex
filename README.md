# Pokédex (React + Zustand)

A Pokémon Pokédex application built with React, TypeScript, and Zustand.  
Displays information for the first 151 Pokémon, including types, stats, flavor text, and evolution chains. Includes filtering by type.

Check out the site here: https://pomimon.github.io/pokedex/

---

## Features

- Pokédex listing of the first 151 Pokémon with images and stats.
- Modal details showing:
  - Animated Pokémon sprite
  - Types
  - Height & weight
  - Base stats
  - Flavor text
  - Evolution chain (limited to first 151 Pokémon)
- Type filtering with clickable badges (single-select) and a "Clear Filters" button.
- Navigation inside the modal to browse next/previous Pokémon.
- Fully responsive modal design with flex layout.

---

## Tech Stack

- React 19 withTypeScript
- Zustand for state management
- CSS Modules for styling
- Fetches data from PokéAPI (https://pokeapi.co/)

---

## Notes

Evolutions are filtered to the first 151 Pokémon.
Only one type filter can be active at a time.
Pokémon data is fetched from the PokéAPI; modal flavor text and evolutions are loaded on demand.
