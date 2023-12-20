import React, { useState } from "react";
import stilo from "./buscador.module.css";

const Buscador = ({ sortBy, onSortChange, value, onChange, setValue }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleSortChange = (event) => {
    onSortChange(event.target.value);
    setModalOpen(!modalOpen);
  };

  const handleModalSubmit = () => {
    setModalOpen(false);
  };

  const handleClearSearch = () => {
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
          {value && (
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
          <div className={stilo.modal__title}>Sort by: </div>
          <div className={stilo.modal__container}>
            <label className={stilo.modal__label}>
              <input
                className={stilo.modal__input1}
                type="radio"
                name="orderBy"
                value="id"
                checked={sortBy === "id"}
                onChange={handleSortChange}
              />
              Number
            </label>
            <label className={stilo.modal__label}>
              <input
                className={stilo.modal__input2}
                type="radio"
                name="orderBy"
                value="nombre"
                checked={sortBy === "nombre"}
                onChange={handleSortChange}
              />
              Name
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buscador;
