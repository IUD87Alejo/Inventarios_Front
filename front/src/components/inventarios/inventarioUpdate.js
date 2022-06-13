/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getInventariosById, editInventario } from '../../services/inventarioService';

import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTipos } from '../../services/tipoEquipoService';
import { getEstados } from '../../services/estadoEquipoService';

import Swal from 'sweetalert2';

export const inventarioUpdate = () => {

    //#region tipos de consultas
    //como obtener los parametros que viajan en la ruta
    //metodo1
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const params = useParams();
    // console.log(params);

    //metodo2
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const {id, serial} = useParams();
    // console.log(id, serial);
    //#endregion  tipos de consultas
    
    const { inventarioId = '' } = useParams();
    const [ inventario, setInventario ] = useState();
    const [ usuarios, setUsuarios ] = useState([]);
    const [ marcas, setMarcas ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ estados, setEstados ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState({});
    const { serial = '', modelo = '', descripcion = '', color = '', foto = '', fechaCompra = '', 
            precio = '', usuario, marca, tipo, estado } = valoresForm;

    const getInventario = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await getInventariosById(inventarioId);
            setInventario(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getInventario();
    }, [ inventarioId ]);

    useEffect(() => {
        if(inventario){
            setValoresForm({
                serial: inventario.serial,
                modelo: inventario.modelo,
                descripcion: inventario.descripcion,
                foto: inventario.foto,
                fechaCompra: inventario.fechaCompra,
                precio: inventario.precio,
                usuario: inventario.usuario,
                marca: inventario.marca,
                tipo: inventario.tipo,
                estado: inventario.estado,
                color: 'Negro'
            });
        }
    }, [ inventario ]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({...valoresForm, [name]: value}); // spread
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const inventario = {
            serial, modelo, descripcion, color, foto, fechaCompra, precio, 
            usuario: {_id: usuario}, marca: {_id: marca}, tipo: {_id: tipo}, estado: {_id: estado}
        }
        console.log(inventario);
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editInventario(inventarioId, inventario);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.fire('Error', 'Ocurrio un error, por favor verifique los datos', 'error');
            Swal.close();
        }
    }

    //metodo 1 para hacer la consulta y listar
    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarMarcas();
    }, []);

    //metodo 2 para hacer la consulta y listar
    useEffect(() => {
        const listarTipos = async () => {
            try {
                const { data } = await getTipos();
                setTipos(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        listarTipos();
    }, []);

    useEffect(() => {
        const listarEstados = async () => {
            try {
                const { data } = await getEstados();
                setEstados(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        listarEstados();
    }, []);

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Detalle activo</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-4'>
                        <img src={inventario?.foto} ></img>
                    </div>
                    <div className='col-md-8'>
                        <form onSubmit={(e) => handleOnSubmit(e)}>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="text" name='serial'
                                            required
                                            minLength={3}
                                            value={serial} 
                                            onChange={ (e) => handleOnChange(e) }
                                            className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Modelo</label>
                                        <input type="text" name='modelo' required value={modelo} onChange={ (e) => handleOnChange(e) } className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Descripción</label>
                                        <input type="text" name='descripcion' required value={descripcion} onChange={ (e) => handleOnChange(e) } className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Color</label>
                                        <input type="text" name='color' value={color} onChange={ (e) => handleOnChange(e) } className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Foto</label>
                                        <input type="url" name='foto' required value={foto} onChange={ (e) => handleOnChange(e) } className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Fecha Compra</label>
                                        <input type="date" name='fechaCompra' required value={fechaCompra} onChange={ (e) => handleOnChange(e) } className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Precio</label>
                                        <input type="number" name='precio' required value={precio} onChange={ (e) => handleOnChange(e) } className="form-control" />
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Usuario</label>
                                        <select className="form-select"
                                            required
                                            onChange={ (e) => handleOnChange(e) }
                                            name='usuario'
                                            value={usuario}>
                                            <option value="">Seleccione una opción</option>
                                            {
                                                usuarios.map((usuario) => {
                                                    return <option key={usuario._id} value={usuario._id}>{usuario.nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Marca</label>
                                        <select className="form-select"
                                            required
                                            onChange={ (e) => handleOnChange(e) }
                                            name='marca'
                                            value={marca}>
                                            <option value="">Seleccione una opción</option>
                                            {
                                                marcas.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Tipo Equipo</label>
                                        <select className="form-select"
                                            required
                                            onChange={ (e) => handleOnChange(e) }
                                            name='tipo'
                                            value={tipo}>
                                            <option value="">Seleccione una opción</option>
                                            {
                                                tipos.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="mb-3">
                                        <label className="form-label">Estado Equipo</label>
                                        <select className="form-select"
                                            required
                                            onChange={ (e) => handleOnChange(e) }
                                            name='estado'
                                            value={estado}>
                                            <option value="">Seleccione una opción</option>
                                            {
                                                estados.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className="btn btn-outline-primary">Actualizar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
