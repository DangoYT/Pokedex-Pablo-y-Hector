import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import './index.css';
import ListaPokemon from './components/listaPokemon/ListaPokemon.jsx';
import DetallePokemon from './components/pokemonDetail/DetallePokemon.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/ListaPokemon",
    element: <ListaPokemon />,
  },
  {
    path: "/DetallePokemon",
    element: <DetallePokemon />,
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
