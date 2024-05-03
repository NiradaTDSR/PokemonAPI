import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonSelector.css'; 
const PokemonSelector = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [rightPokemon, setRightPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      setPokemonList(response.data.results);
    };

    fetchPokemonList();
  }, []);

  const handlePokemonSelect = async (pokemonName, side) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const selectedPokemon = response.data;

    if (side === 'left') {
      setLeftPokemon(selectedPokemon);
    } else if (side === 'right') {
      setRightPokemon(selectedPokemon);
    }
  };

  const renderPokemonDetails = (pokemon) => {
    return (
      <div className="pokemon-details">
        <h4>{pokemon.name}</h4>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <h5>Abilities:</h5>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
        {/* <h5>Types:</h5>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul> */}
        {/* <h5>Stats:</h5>
        <ul>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul> */}
      </div>
    );
  };

  return (
    <div className="pokemon-selector">
      <div className="pokemon-select">
        <select onChange={(e) => handlePokemonSelect(e.target.value, 'left')}>
          <option value="">Select a Pokemon</option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
        {leftPokemon && renderPokemonDetails(leftPokemon)}
      </div>

      <div className="pokemon-select">
        <select onChange={(e) => handlePokemonSelect(e.target.value, 'right')}>
          <option value="">Select a Pokemon</option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.name} value={pokemon.name}>
              {pokemon.name}
            </option>
          ))}
        </select>
        {rightPokemon && renderPokemonDetails(rightPokemon)}
      </div>
    </div>
  );
};

export default PokemonSelector;
