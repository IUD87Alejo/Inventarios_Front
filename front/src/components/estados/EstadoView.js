import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEstados, crearEstado, editEstado, getEstado } from '../../services/estadoEquipoService';
import Swal from 'sweetalert2';

export const EstadoView = () => {

  const { estadosId = ''} = useParams();
  const [ estados, setEstados ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const obtenerEstado = async ({_id}) => {
    console.log('obtenerTipo');
    console.log(_id);
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await getEstado(_id);
        console.log(data);
        //setEstados(data);
        Swal.close();
    } catch (error) {
        console.log(error);
        Swal.close();
    }
  }

  useEffect(() => {
    obtenerEstado();
  }, [ estadosId ]);

  useEffect(() => {
      if(estados){
          setValoresForm({
              nombre: estados.nombre,
              estado: estados.estado,
          });
      }
  }, [ estados ]);
  
  const listarEstados = async () => {
    try {
      const resp = await getEstados();
      console.log(resp.data);
      setEstados(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearEstado = (e) => {
    e.preventDefault();
    nuevoEstado(valoresForm);
  }

  const nuevoEstado = async (estadoE) =>{
    try {
      const resp = await crearEstado(estadoE);
      console.log(resp.data);
      listarEstados();
      setValoresForm({ nombre: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarEstados();
  }, []);

  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearEstado(e) }>
          <legend>Crer/Editar Estado Equipos</legend>
          <div className='row'>
            <div className='col-md-8'>
              <label className="form-label">Nombre</label>
              <input name="nombre" value={nombre} type="text" id="disabledTextInput"
              className="form-control" placeholder="Ingrese un nombre" onChange={(e) => handleOnChange(e)}/>
            </div>
            <div className='col-md-4'>
              <label className="form-label">Estado</label>
              <select name="estado" value={estado} className="form-select" onChange={(e) => handleOnChange(e)}>
                <option defaultValue>Seleccione una opción</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>
          <button className="btn btn-outline-primary">Submit</button>
      </form>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {
            estados.map(estadoE => {
              return <tr key={estadoE._id}>
                <th>{estadoE.nombre}</th>
                <td>{estadoE.estado}</td>
                <td>{estadoE.fecha_creacion}</td>
                <td>{estadoE.fecha_actualizacion}</td>
                <td><button className="btn btn-warning fa-solid fa-pen-to-square" onClick={() => obtenerEstado(estadoE)}></button></td>
                {/* <td><Route exact className="btn btn-warning fa-solid fa-pen-to-square" path='/marcas/:marcaId' component={ MarcaView }/></td> */}
              </tr>
            })
          }
          
        </tbody>
      </table>
    </div>
  )
}
