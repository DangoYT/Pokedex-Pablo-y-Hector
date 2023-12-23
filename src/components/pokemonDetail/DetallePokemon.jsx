import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable'
import estilos from './detallePokemon.module.css'
import Slider from '../inputRange/Slider';
import flechaIzquierda from  "/public/icons/chevron_left.svg"
import flechaDerecha from "/public/icons/chevron_right.svg"
import arrowBack from "/public/icons/arrow_back.svg"
import weight from "/public/icons/weight.svg"
import height from "/public/icons/straighten.svg"


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
    setPokedescription(data.flavor_text_entries[10].flavor_text);
  };
  const typeUno = estilos[poketype.types?.[0]?.type.name || 'default'];

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

  const formatearIDPokemon = (id) => {
    // Añadir ceros a la izquierda para que tenga siempre tres dígitos
    return `#${String(id).padStart(3, '0')}`;
  };

  const formattedId = formatearIDPokemon(pokemonInfo?.id || 0);

  const [max, setMax] = useState(255);

  return (
    <div {...handlers} className={`${typeUno} ${estilos.container}`} >
      <div>
        <img className={estilos.arrow_left} src={flechaIzquierda} alt="" onClick={decreasePkId} />
      </div>
      <div>
        <img className={estilos.arrow_right} src={flechaDerecha} alt="" onClick={increasePkId} />
      </div>

      {pokemonInfo ? (
        <>
          <div className={estilos.header}>
            <img className={estilos.arrow_back} src={arrowBack} alt="" onClick={navegarAtras} />
            <p className={estilos.title}>{pokemonInfo.name}</p>
            <span className={estilos.id}>{formattedId}</span>
          </div>
          <div className={estilos.image_container}>
            <div>
              <img className={estilos.image} src={poketype.sprites.other["official-artwork"].front_default} alt="" />
            </div>
            <div>
              <img className={estilos.gift} src={poketype.sprites.versions["generation-v"]["black-white"].animated.front_shiny} alt="" />
            </div>
          </div>
          `${typeUno} ${estilos.type_p}`
          <div className={estilos.content}>
            <div className={estilos.typesContainer}>
              {poketype.types.map((type, index) => (
                <div className={`${estilos[type.type.name]} ${estilos.types}`} key={type.type.name}>
                  <p className={estilos.type_p} key={type.type.name}>{type.type.name}</p>
                </div>
              ))}
            </div>
            <h2 className={estilos.h2}>About</h2>
            <div className={estilos.aboutContainer}>
              <div className={estilos.weightContainer}>
                <img src={weight} alt="" className={estilos.weightIcon} />
                <p className={estilos.weightTitle}>Weight</p>
                <p className={estilos.weight}>{poketype.weight}</p>
              </div>
              <div className={estilos.heightContainer}>
                <img src={height} alt="" className={estilos.heightIcon} />
                <p className={estilos.heightTitle}>Height</p>
                <p className={estilos.height}>{poketype.height}</p>
              </div>
              <div className={estilos.abilitiesContainer}>
                {poketype.abilities.map((ability, index) => (
                  <p className={estilos.abilities} key={index}>{ability.ability.name}</p>
                ))}
                <p className={estilos.abilities_title}>Moves</p>
              </div>
            </div>
            <div className={estilos.descriptionContainer}>
              <p className={estilos.description}>{pokedescription}</p>
            </div>
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
                  <Slider
                    className={estilos.range}
                    key={index}
                    type="range"
                    min="0"
                    max={max}
                    value={stat.base_stat}
                    tipoDePokemon={poketype.types[0].type.name}
                    readOnly />
                ))}
              </div>
            </div>
          </div>


        </>
      ) : (
        <p>Cargando información del Pokémon...</p>
      )}
    </div>
  );
}
