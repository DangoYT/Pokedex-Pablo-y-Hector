import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable'
import estilos from './detallePokemon.module.css'

export default function DetallePokemon() {


  const config = {
    delta: 10,                             // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false,           // prevents scroll during swipe (*See Details*)
    trackTouch: true,                      // track touch input
    trackMouse: true,                     // track mouse input
    rotationAngle: 0,                      // set a rotation angle
    swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => increasePkId(),
    onSwipedRight: () => decreasePkId(),
    ...config
  });


  const navigate = useNavigate();
  const location = useLocation();



  const { pkUrl, pkId } = location.state;

  const [idPokemon, setIdPokemon] = useState(pkId);
  const [pokemonInfo, setPokemonInfo] = useState(null);

  const [pokedescription, setPokedescription] = useState('');
  const [poketype, setPoketype] = useState('');


  const navegarAtras = () => {
    navigate(`/ListaPokemon`,);
  }

  const increasePkId = () => {
    setIdPokemon(prevId => prevId + 1);
  };

  const decreasePkId = () => {
    setIdPokemon(prevId => (prevId > 1 ? prevId - 1 : prevId));
  };


  const obtenerTipo = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`
    );
    const data = await response.json();
    setPoketype(data);
  }

  const obternerDescripcion = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`
    );
    const data = await response.json();
    setPokedescription(data.flavor_text_entries.filter(entry => entry.language.name === 'en')[0].flavor_text);
  };

  useEffect(() => {
    const pokeApiUnica = `https://pokeapi.co/api/v2/pokemon-species/${idPokemon}/`;

    const fetchData = async () => {
      try {
        const response = await fetch(pokeApiUnica);
        const data = await response.json();
        // Aquí puedes ajustar según la estructura real de la respuesta
        setPokemonInfo(data);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    obtenerTipo();
    obternerDescripcion();
    fetchData();
  }, [idPokemon]);


  return (
    <div {...handlers} className={estilos.container} >
      <div>
        <img className={estilos.arrow_left} src="./public/icons/chevron_left.svg" alt="" onClick={decreasePkId} />
      </div>
      <div>
        <img className={estilos.arrow_right} src="./public/icons/chevron_right.svg" alt="" onClick={increasePkId} />
      </div>

      {pokemonInfo ? (
        <>
          <div>
            <img className={estilos.arrow_back} src="./public/icons/arrow_back.svg" alt="" onClick={navegarAtras} />
            <p className={estilos.title}>{pokemonInfo.name}</p>
            <span className={estilos.id}>{pokemonInfo.id}</span>
          </div>
          <div className={estilos.image_container}>
            <div>
              <img className={estilos.image} src={poketype.sprites.other["official-artwork"].front_default} alt="" />
            </div>
            <div>
              <img className={estilos.gift} src={poketype.sprites.versions["generation-v"]["black-white"].animated.front_shiny} alt="" />
            </div>
          </div>
          <div className={estilos.types}>
            {poketype.types.map((type, index) => (
              <p className={estilos.type_p} key={index}>{type.type.name}</p>
            ))}
          </div>
          <h2 className={estilos.h2}>About</h2>
          <div className={estilos.aboutContainer}>
            <div className={estilos.heightContainer}>
              <p className={estilos.height}>{poketype.height}</p>
            </div>
            <div className={estilos.weightContainer}>
              <p className={estilos.weight}>{poketype.weight}</p>
            </div>
            <div className={estilos.abilitiesContainer}>
              {poketype.abilities.map((ability, index) => (
                <p className={estilos.abilities} key={index}>{ability.ability.name}</p>
              ))}
            </div>
          </div>

          <p className={estilos.description}>{pokedescription}</p>

          <h3 className={estilos.h3}>Base Stats</h3>
          <div className={estilos.statsContainer}>
            <div className={estilos.statsTitle}>
              <p>HP</p>
              <p>ATK</p>
              <p>DEF</p>
              <p>SATK</p>
              <p>SDEF</p>
              <p>SPD</p>
            </div>
            <div className={estilos.statsValue}>
              {poketype.stats.map((stat, index) => (
                <p className={estilos.stats} key={index}>{stat.base_stat}</p>
              ))}
            </div>
            <div className={estilos.statsRange}>
              {poketype.stats.map((stat, index) => (
                <input
                  className={estilos.range}
                  key={index}
                  type="range"
                  min="0"
                  max="255"
                  value={stat.base_stat}
                  readOnly
                />
              ))}
            </div>
          </div>


        </>
      ) : (
        <p>Cargando información del Pokémon...</p>
      )}
    </div>
  );
}
