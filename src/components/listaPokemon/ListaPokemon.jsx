import React, { useState, useEffect } from 'react';
import PokemonCard from '../pokemonCard/PokemonCard';
import Buscador from '../buscador/Buscador';
import './listaPokemon.module.css'
import Titulo from '../titulo/titulo';


function ListaPokemon() {
  const [pokemonList, setPokemonList] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [resultados, setResultados] = useState([]);



  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=9');
        const data = await response.json();
        const results = data.results;
        setResultados(results);

        const detailedPokemonList = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            return {
              id: pokemonData.id,
              name: pokemonData.name,
              type: pokemonData.types[0].type.name,
              image: pokemonData.sprites.front_default,
              description: pokemonData.species,
              height: pokemonData.height,
              weight: pokemonData.weight,
              abilities: pokemonData.abilities,
              url: pokemon.url,
              gif: pokemonData.sprites.versions["generation-v"]["black-white"].animated.front_shiny,
              imgHd: pokemonData.sprites.other["official-artwork"].front_default
            };
          })
        );

        setPokemonList(detailedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemonData();
  }, []);

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getSortedAndFilteredPokemonList = () => {
    let filteredList = pokemonList;

    // Filtrar por término de búsqueda
    if (searchTerm.trim() !== '') {
      filteredList = pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar según el tipo seleccionado
    if (sortBy === 'id') {
      return [...filteredList].sort((a, b) => a.id - b.id);
    } else if (sortBy === 'nombre') {
      return [...filteredList].sort((a, b) => a.name.localeCompare(b.name));
    }
  };

  const sortedAndFilteredPokemonList = getSortedAndFilteredPokemonList();

  return (
    <div>
      <Titulo />
      <Buscador sortBy={sortBy} onSortChange={handleSortChange} value={searchTerm} onChange={handleSearchChange} />
      {sortedAndFilteredPokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} resultados={resultados} />
      ))}
    </div>
  );
}

export default ListaPokemon;
