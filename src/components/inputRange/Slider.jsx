import styled from 'styled-components';

const Slider = styled.input.attrs(({ max, tipoDePokemon, ...props }) => ({
  type: 'range',
  min: '0',
  max: max, // Asegúrate de que el valor máximo sea 255
  ...props,
}))`
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 4px;
  border: none;
  border-radius: 4px;
  background: ${(props) =>
    `linear-gradient(to right, ${getColorForType(props.tipoDePokemon)} 0%, ${getColorForType(props.tipoDePokemon)} ${props.value}%, #fff ${props.value}%, #fff 100%);`};

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
  }

  &::-moz-range-thumb {
    width: 0;
  }
`;
const getColorForType = (type) => {
  // Lógica para asignar un color específico a cada tipo de Pokémon
  // Puedes ajustar esta función según tus necesidades
  switch (type) {
    case 'normal':
      return '#AAA67F';
    case 'fighting':
      return '#C12239';
    case 'flying':
      return '#A891EC';
    case 'poison':
      return '#A43E9E';
    case 'ground':
      return '#DEC16B';
    case 'rock':
      return '#B69E31';
    case 'bug':
      return '#A7B723';
    case 'ghost':
      return '#70559B';
    case 'steel':
      return '#B7B9D0';
    case 'fire':
      return '#F57D31';
    case 'water':
      return '#6493EB';
    case 'grass':
      return '#74CB48';
    case 'electric':
      return '#F9CF30';
    case 'psychic':
      return '#FB5584';
    case 'ice':
      return '#9AD6DF';
    case 'dragon':
      return '#7037FF';
    case 'dark':
      return '#75574C';
    case 'fairy':
      return '#E69EAC';
    // ... otros tipos de Pokémon ...
    default:
      return '#888'; // Color por defecto o para tipos desconocidos
  }
};

export default Slider;
