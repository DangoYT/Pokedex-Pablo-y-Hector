import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import estilos from "./pokemonCard.module.css";

export default function PokemonCard({ pokemon, resultados }) {
  const [pokemonUrl, setPokemonUrl] = useState(pokemon.url);

  const navigate = useNavigate();
  const navegar = () => {
    navigate(`/DetallePokemon`, {
      state: { pkUrl: pokemonUrl, pkId: pokemon.id },
    });
  };

  return (
    <div className={estilos.card} onClick={() => navegar()}>
      <div className={estilos.id}>
        <span>{pokemon.id}</span>
      </div>
      <div className={estilos.imagecontainer}>
        <img className={estilos.image} src={pokemon.gif} alt="" />
      </div>
      <div className={estilos.title}>
        <p>{pokemon.name}</p>
      </div>

      {/* <p>{pokemon.url}</p> */}
      {/*   <p>{pokemon.type}</p>
      <p>{pokemon.abilities[0].ability.name}</p>
      <p>{pokemon.abilities[1].ability.name}</p>
      <p>{pokemon.height}</p>
      <p>{pokemon.weight}</p> */}
    </div>
  );
}
