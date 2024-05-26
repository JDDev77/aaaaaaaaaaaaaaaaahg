import React from 'react';
import Nav from './Nav';
import { NavLink } from 'react-router-dom';
import icon from '../../../assets/img/icono_header.png'; // Asegúrate de que la ruta es correcta

export const AdminHeader = () => {
    return (
        <header className="layout__navbar admin">
            <NavLink to="/social" className="navbar__title">
                <img src={icon} alt="Icon" className="navbar__icon_admin" /> {/* Aquí se muestra el icono */}
            </NavLink>
            <Nav />
        </header>
    );
}

export default AdminHeader;
