import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getMarcas, crearMarca, editMarca, getMarca } from '../../services/marcaService';
import Swal from 'sweetalert2';

export const MarcaView = () => {

  const { marcaId = ''} = useParams();
  const [ marcas, setMarcas ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState({});
  const { nombre = '', estado = '' } = valoresForm;

  const obtenerMarca = async ({_id}) => {
    console.log('obtenerMarca');
    console.log(_id);
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await getMarca(_id);
        console.log(data);
        //setMarcas(data);
        Swal.close();
    } catch (error) {
        console.log(error);
        Swal.close();
    }
  }

    useEffect(() => {
      obtenerMarca();
    }, [ marcaId ]);

    useEffect(() => {
        if(marcas){
            setValoresForm({
                nombre: marcas.nombre,
                estado: marcas.estado,
            });
        }
    }, [ marcas ]);

  const listarMarcas = async () => {
    try {
      const resp = await getMarcas();
      console.log(resp.data);
      setMarcas(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearMarca = (e) => {
    e.preventDefault();
    nuevaMarca(valoresForm);
  }

  const nuevaMarca = async (marca) =>{
    try {
      const resp = await crearMarca(marca);
      console.log(resp.data);
      listarMarcas();
      setValoresForm({ nombre: '', estado: '' });
    } catch (error) {
      console.log(error);
    }
  }

  // const editarMarca = async (marca) => {
  //   try {
  //     const resp = await editMarca();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    listarMarcas();
  }, []);

  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearMarca(e) }>
          <legend>Crer/Editar Marcas</legend>
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
            marcas.map(marca => {
              return <tr key={marca._id}>
                <th>{marca.nombre}</th>
                <td>{marca.estado}</td>
                <td>{marca.fecha_creacion}</td>
                <td>{marca.fecha_actualizacion}</td>
                <td><button className="btn btn-warning fa-solid fa-pen-to-square" onClick={() => obtenerMarca(marca)}></button></td>
                {/* <td><Route exact className="btn btn-warning fa-solid fa-pen-to-square" path='/marcas/:marcaId' component={ MarcaView }/></td> */}
              </tr>
            })
          }
          
        </tbody>
      </table>
    </div>
  )
}