import React from 'react';
import Nav from '../private/Nav';
import { NavLink } from 'react-router-dom';
import icon from '../../../assets/img/icono_header.png'; // Asegúrate de que la ruta es correcta

export const Header = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <NavLink to="/social" className="navbar__title">
          <img src={icon} alt="Icon" className="list-end__img" /> {/* Aquí se muestra el icono */}
        </NavLink>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
