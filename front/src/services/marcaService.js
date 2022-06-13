import { axiosInstance } from '../helpers/axios-config';

const path = 'marcas';

//Metodo listar todos
const getMarcas = () => {
    return axiosInstance.get(`${path}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo listar todos
const getMarca = (marcaId) => {
    console.log(marcaId);
    const resp = axiosInstance.get(`${path}/${marcaId}`, {
        headers:{
            'Content-type': 'application/json'
        }
    });
    return resp;
}

//Metodo Creación
const crearMarca = (data) => {
    return axiosInstance.post(`${path}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

//Metodo actualización
const editMarca = (marcaId, data) => {
    return axiosInstance.put(`${path}/${marcaId}`, data, {
        headers:{
            'Content-type': 'application/json'
        }
    });
}

export{
    getMarcas, getMarca, crearMarca, editMarca
}