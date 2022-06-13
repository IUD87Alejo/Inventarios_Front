import { axiosInstance } from '../helpers/axios-config';

const path = 'tipo_equipos';

//Metodo listar todos
const getTipos = () => {
    return axiosInstance.get(`${path}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo listar todos
const getTipo = (id) => {
    const resp = axiosInstance.get(`${path}/${id}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

//Metodo Creación
const crearTipo = (data) => {
    return axiosInstance.post(`${path}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo actualización
const editTipo = (id, data) => {
    return axiosInstance.put(`${path}/${id}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

export{
    getTipos, getTipo, crearTipo, editTipo
}