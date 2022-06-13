import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getUsuarios, crearUsuario, editUsuario, getUsuario } from '../../services/usuarioService';
import Swal from 'sweetalert2';

export const UsuarioView = () => {

  const { userId = ''} = useParams();
  const [ users, setUsers ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState({});
  const { id = '',nombre = '', estado = '', email = '' } = valoresForm;

  const obtenerUser = async ({_id}) => {
    console.log('obtenerMarca');
    console.log(_id);
    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await getUsuario(_id);
        console.log(data);
        setValoresForm({ id: data._id, nombre: data.nombre, estado: data.estado, email: data.email });
        Swal.close();
    } catch (error) {
        console.log(error);
        Swal.close();
    }
  }

  useEffect(() => {
    obtenerUser();
  }, [ userId ]);

  useEffect(() => {
      if(users){
          setValoresForm({
              id: users._id,
              nombre: users.nombre,
              estado: users.estado,
              email: users.email
          });
      }
  }, [ users ]);

  const listarUsers = async () => {
    try {
      const resp = await getUsuarios();
      console.log(resp.data);
      setUsers(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnChange = (e) => {
    setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
  }

  const handleCrearMarca = (e) => {
    e.preventDefault();
    console.log(valoresForm);
    if(valoresForm.id === undefined){
      console.log('si');
      nuevoUser(valoresForm);
    }else{
      console.log('no');
      editUser(valoresForm.id, valoresForm);
    }
  }

  const nuevoUser = async (user) =>{
    try {
      const resp = await crearUsuario(user);
      console.log(resp.data);
      listarUsers();
      setValoresForm({ nombre: '', estado: '', email: '' });
    } catch (error) {
      console.log(error);
    }
  }

  const editUser = async (id ,user) =>{
    try {
      const resp = await editUsuario(id ,user);
      console.log(resp.data);
      listarUsers();
      setValoresForm({id:'', nombre: '', estado: '', email: '' });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarUsers();
  }, []);



  return (
    <div className="container-fluid">
      <form onSubmit={ (e) => handleCrearMarca(e) }>
          <legend>Crer/Editar Usuarios</legend>
          <div className='row'>
            <div className='col-md-4'>
              <label className="form-label">Nombre</label>
              <input name="nombre" value={nombre} type="text" id="disabledTextInput" required
              className="form-control" placeholder="Ingrese un nombre" onChange={(e) => handleOnChange(e)}/>
            </div>
            <div className='col-md-4'>
              <label className="form-label">Email</label>
              <input name="email" value={email} type="email" id="disabledTextInput" required
              className="form-control" placeholder="Ingrese un correo" onChange={(e) => handleOnChange(e)}/>
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
            <th>Email</th>
            <th>Fecha Creación</th>
            <th>Fecha Actualización</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {
            users.map(user => {
              return <tr key={user._id}>
                <th>{user.nombre}</th>
                <td>{user.estado}</td>
                <td>{user.email}</td>
                <td>{user.fecha_creacion}</td>
                <td>{user.fecha_actualizacion}</td>
                <td><button className="btn btn-warning fa-solid fa-pen-to-square" onClick={() => obtenerUser(user)}></button></td>
                {/* <td><Route exact className="btn btn-warning fa-solid fa-pen-to-square" path='/marcas/:marcaId' component={ MarcaView }/></td> */}
              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}
