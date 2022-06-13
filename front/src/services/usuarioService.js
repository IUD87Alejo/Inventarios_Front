import { axiosInstance } from '../helpers/axios-config';

const path = 'users';

//Metodo listar todos
const getUsuarios = () => {
    return axiosInstance.get(`${path}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo listar todos
const getUsuario = (id) => {
    const resp = axiosInstance.get(`${path}/${id}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

//Metodo Creación
const crearUsuario = (data) => {
    console.log(data);
    return axiosInstance.post(`${path}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo actualización
const editUsuario = (id, data) => {
    return axiosInstance.put(`${path}/${id}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

export{
    getUsuarios, getUsuario, crearUsuario, editUsuario
}