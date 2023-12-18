import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import estilos from './pokemonCard.module.css';

export default function PokemonCard({  pokemon, resultados }) {

  const [pokemonUrl, setPokemonUrl] = useState(pokemon.url);

  const navigate = useNavigate();
  const navegar = () => {
    navigate(`/DetallePokemon`, { state: { pkUrl: pokemonUrl, pkId: pokemon.id } });
  }

  return (
    <div className={estilos.card} onClick={() => navegar()}>
      <p className={estilos.title}>{pokemon.name}</p>
      <span className={estilos.id}>{pokemon.id}</span>
      <img className={estilos.image} src={pokemon.image} alt="" />
      {/* <p>{pokemon.url}</p> */}
    {/*   <p>{pokemon.type}</p>
      <p>{pokemon.abilities[0].ability.name}</p>
      <p>{pokemon.abilities[1].ability.name}</p>
      <p>{pokemon.height}</p>
      <p>{pokemon.weight}</p> */}

    </div>
  );
}
