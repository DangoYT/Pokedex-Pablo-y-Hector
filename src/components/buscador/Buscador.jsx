import React, { useState } from "react";
import stilo from "./buscador.module.css";

const Buscador = ({ sortBy, onSortChange, value, onChange, setValue }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
  };

  const handleModalSubmit = () => {
    setModalOpen(false);
  };

  const handleClearSearch = () => {
    // Limpiar el estado interno del componente y el campo de búsqueda
    setModalOpen(false);
    setValue("");
    console.log(onChange);
  };

  return (
    <div className={stilo.buscador}>
      <div className={stilo.buscador__container}>
        <div className={stilo.buscador__input}>
          <img
            className={stilo.buscador__lupa}
            src="public/icons/search.svg"
            alt=""
          />
          <input
          id="search"
            className={stilo.buscador__inputText}
            type="text"
            placeholder="Search"
            value={value}
            onChange={onChange}
          />
          {value && ( // Mostrar el elemento buscador__close solo si el campo de búsqueda no está vacío
            <img
              className={stilo.buscador__close}
              src="public/icons/close.svg"
              alt=""
              onClick={handleClearSearch}
            />
          )}
        </div>
        <div className={stilo.buscador__imageContainer}>
          <img
            className={stilo.buscador__image}
            src="public/icons/sort.svg"
            alt="Numeral"
            onClick={handleModalToggle}
          />
        </div>
      </div>

      {modalOpen && (
        <div className={stilo.modal}>
          <label>
            <input
              className={stilo.modal__input1}
              type="radio"
              name="orderBy"
              value="id"
              checked={sortBy === "id"}
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
              checked={sortBy === "nombre"}
              onChange={handleSortChange}
            />
            Ordenar por Nombre
          </label>
        </div>
      )}
    </div>
  );
}

export default Buscador;