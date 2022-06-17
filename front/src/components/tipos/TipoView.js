import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getTipos, crearTipo, editTipo, getTipo } from '../../services/tipoEquipoService';
import Swal from 'sweetalert2';

export const TipoView = () => {

  const { tiposId = ''} = useParams();
  const [ tipos, setTipos ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState({});
  const { id = '', nombre = '', estado = '' } = valoresForm;

  const obtenerTipo = async ({_id}) => {
    console.log('obtenerTipo');
    console.log(_id);
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await getTipo(_id);
        console.log(data);
        setValoresForm({ id: data._id, nombre: data.nombre, estado: data.estado });
        Swal.close();
    } catch (error) {
        console.log(error);
        Swal.close();
    }
  }

  useEffect(() => {
    obtenerTipo();
  }, [ tiposId ]);

  useEffect(() => {
      if(tipos){
          setValoresForm({
              nombre: tipos.nombre,
              estado: tipos.estado,
          });
      }
  }, [ tipos ]);

  const listarTipos = async () => {
    try {
      const resp = await getTipos();
      console.log(resp.data);
      setTipos(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearTipo = (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if(valoresForm.id === undefined){
      console.log('si');
      nuevoTipo(valoresForm);
    }else{
      console.log('no');
      editarTipo(valoresForm.id, valoresForm);
    }
    
  }

  const nuevoTipo = async (tipo) =>{
    try {
      const resp = await crearTipo(tipo);
      console.log(resp.data);
      listarTipos();
      setValoresForm({ id:'', nombre: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }

  const editarTipo = async (id ,tipo) =>{
    try {
      const resp = await editTipo(id ,tipo);
      console.log(resp.data);
      listarTipos();
      setValoresForm({ id:'', nombre: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTipos();
  }, []);


  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearTipo(e) }>
          <legend>Crer/Editar Tipos Equipos</legend>
          <div className='row'>
            <div className='col-md-8'>
              <label className="form-label">Nombre</label>
              <input name="nombre" value={nombre} type="text" id="disabledTextInput" required
              className="form-control" placeholder="Ingrese un nombre" onChange={(e) => handleOnChange(e)}/>
            </div>
            <div className='col-md-4'>
              <label className="form-label">Estado</label>
              <select name="estado" value={estado} className="form-select" required onChange={(e) => handleOnChange(e)}>
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
            tipos.map(tipo => {
              return <tr key={tipo._id}>
                <th>{tipo.nombre}</th>
                <td>{tipo.estado}</td>
                <td>{tipo.fecha_creacion}</td>
                <td>{tipo.fecha_actualizacion}</td>
                <td><button className="btn btn-warning fa-solid fa-pen-to-square" onClick={() => obtenerTipo(tipo)}></button></td>
                {/* <td><Route exact className="btn btn-warning fa-solid fa-pen-to-square" path='/marcas/:marcaId' component={ MarcaView }/></td> */}
              </tr>
            })
          }
          
        </tbody>
      </table>
    </div>
  )
}
