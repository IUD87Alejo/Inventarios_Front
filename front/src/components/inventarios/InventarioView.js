import React, { useState, useEffect } from 'react';
import { getInventarios } from '../../services/inventarioService';
import { InventarioCard } from './InventarioCard';
import { InventarioNew } from './InventarioNew';
import Swal from 'sweetalert2';

export const InventarioView = () => {

  const [ inventarios, setInventarios ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarInventarios = async () => {
    
    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      const { data } = await getInventarios();
      setInventarios(data);
      console.log(data);
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
    
    // try {
    //   const resp = await getInventarios();
    //   console.log(resp.data);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  //Se hace oara que solo se haga un llamado a listar inventarios
  useEffect(() => {
    listarInventarios();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className='container'>
        <div className=" mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
            {
              inventarios.map((inventarios) => {
                return <InventarioCard key={inventarios._id} inventarios={inventarios}/>
              })
            }
        </div>
        {
          openModal ? <InventarioNew 
                        handleOpenModal={ handleOpenModal }
                        listarInventarios={ listarInventarios }/> : 
          (<button className='btn btn-primary fab' onClick={ handleOpenModal }>
            <i className="fa-solid fa-plus"></i>
          </button>)
        }
        

    </div>
  )
}
