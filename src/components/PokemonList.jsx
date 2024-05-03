import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonDetail from './PokemonDetail';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=0')
      .then(response => {
        setPokemonList(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching Pokemon list:', error);
      });
  }, []);

  const handlePokemonClick = (pokemonName) => {
    setSelectedPokemon(pokemonName);
  };

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul>
        {pokemonList.map(pokemon => (
          <li key={pokemon.name} onClick={() => handlePokemonClick(pokemon.name)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      {selectedPokemon && <PokemonDetail pokemonName={selectedPokemon} />}
    </div>
  );
};

export default PokemonList;
