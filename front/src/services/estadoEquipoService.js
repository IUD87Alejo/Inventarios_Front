import { axiosInstance } from '../helpers/axios-config';

const path = 'estado_equipos';

//Metodo listar todos
const getEstados = () => {
    return axiosInstance.get(`${path}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo listar todos
const getEstado = (id) => {
    const resp = axiosInstance.get(`${path}/${id}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

//Metodo Creación
const crearEstado = (data) => {
    return axiosInstance.post(`${path}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo actualización
const editEstado = (id, data) => {
    return axiosInstance.put(`${path}/${id}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

export{
    getEstados, getEstado, crearEstado, editEstado
}