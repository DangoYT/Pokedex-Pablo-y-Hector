import React, { useState } from 'react';
import stilo from './buscador.module.css';

export default function Buscador({ sortBy, onSortChange, value, onChange }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  const handleModalSubmit = () => {
    // Aquí puedes realizar acciones adicionales al enviar el formulario dentro del modal
    // Por ejemplo, puedes enviar los valores a través de una función prop o realizar otra lógica
    // También puedes cerrar el modal aquí si es necesario
    setModalOpen(false);
  };

  return (
    <div className={stilo.buscador}>
      <div className={stilo.buscador__container}>
        <input className={stilo.buscador__input} type="search" placeholder="Search Pokémon" value={value} onChange={onChange} />
        <div  className={stilo.buscador__imageContainer}>
          {/* Abrir modal al hacer clic en la imagen */}
          <img
            className={stilo.buscador__image}
            src="public/icons/sort.svg"
            alt="Numeral"
            onClick={handleModalToggle}
          />
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={stilo.modal}>
          <label>
            <input
              className={stilo.modal__input1}
              type="radio"
              name="orderBy"
              value="id"
              checked={sortBy === 'id'}
              onChange={handleSortChange}
            />
            Ordenar por ID
          </label>
          <label>
            <input
              className={stilo.modal__input2}
              type="radio"
              name="orderBy"
              value="nombre"
              checked={sortBy === 'nombre'}
              onChange={handleSortChange}
            />
            Ordenar por Nombre
          </label>
        </div>
      )}
    </div>
  );
}
