import React from 'react';
import Nav from '../public/Nav';
import icon from '../../../assets/img/icono_header.png'; // Asegúrate de que la ruta es correcta

export const Header = () => {
  return (
    <header className="layout__navbar">
      <div className="navbar__header">
        <a href="#" className="navbar__title">
          <img src={icon} alt="Icon" className="navbar__icon" /> {/* Aquí se muestra el icono con la nueva clase */}
        </a>
      </div>
      <Nav />
    </header>
  );
}

export default Header;
