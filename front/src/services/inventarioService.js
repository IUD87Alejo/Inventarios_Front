import { axiosInstance } from '../helpers/axios-config';

//Metodo listar todos
const getInventarios = () => {
    const resp = axiosInstance.get('inventarios', {
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

//Metodo listar por id
const getInventariosById = (inventarioId) => {
    const resp = axiosInstance.get(`inventarios/${inventarioId}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

//Metodo Creación
const crearInventario = (data) => {
    return axiosInstance.post('inventarios', data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo actualización
const editInventario = (id, data) => {
    return axiosInstance.put(`inventarios/${id}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

export{
    getInventarios, getInventariosById, crearInventario, editInventario
}

