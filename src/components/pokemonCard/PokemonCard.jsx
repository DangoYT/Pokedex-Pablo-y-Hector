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
        <span className={estilos.number}>{pokemon.formattedId}</span>
      </div>
      <div className={estilos.imagecontainer}>
        <img className={estilos.image} src={pokemon.gif} alt="" />
      </div>
      <div className={estilos.title}>
        <p className={estilos.name}>{pokemon.name}</p>
      </div>
    </div>
  );
}
