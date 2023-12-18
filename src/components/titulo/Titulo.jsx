import React from 'react'
import estilo from './titulo.module.css'

export default function Titulo() {
    return (
        <div className={estilo.container}>
            <div className={estilo.titulo}>
                <img className={estilo.titulo__img} src="public/icons/pokeball.svg" alt="" />
                <h1 className={estilo.titulo__h1}>Pokédex</h1>
            </div>
        </div>
    )
}
