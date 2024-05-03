import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetail = ({ pokemonName }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonGif, setPokemonGif] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const { data } = response;
        setPokemonData(data);
        setPokemonGif(data.sprites.front_default);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonData();
  }, [pokemonName]);

  if (!pokemonData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{pokemonData.name}</h2>
      {pokemonGif && <img src={pokemonGif} alt={pokemonData.name} />}
      <h3>Abilities:</h3>
      <ul>
        {pokemonData.abilities.map(ability => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonDetail;
