import React from 'react';
import { Link } from 'react-router-dom';

export const InventarioCard = (props) => {

  const { inventarios } = props;

  return (
    <div className="col">
        <div className="card">
            <img src={ inventarios.foto } className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">Caracteristicas</h5>
                <hr />
                <p className="card-text">{`Descripción: ${inventarios.descripcion}`}</p>
                <p className="card-text">{`Marca: ${inventarios.marca.nombre}`}</p>
                <p className="card-text">{`Estado: ${inventarios.estado.nombre}`}</p>
                <p className="card-text">{`Serial: ${inventarios.serial}`}</p>
                <p className='card-text'>
                    {/* <Link to={`inventarios/edit/${inventarios._id}/${inventarios.serial}`}>Ver más...</Link> */}
                    <Link to={`inventarios/edit/${inventarios._id}`}>Ver más...</Link>
                </p>
            </div>
        </div>
    </div>
  )
}
