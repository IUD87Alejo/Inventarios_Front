import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Inventarios & CIA</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact aria-current="page" to="/">Activos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact aria-current="page" to="/usuarios">Usuarios</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact aria-current="page" to="/marcas">Marcas</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact aria-current="page" to="/tipos">Tipos</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact aria-current="page" to="/estados">Estados</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}


