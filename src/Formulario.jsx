import React, { useDebugValue, useState } from 'react'
import {db} from './firebase';//'db'
import { collection, addDoc, deleteDoc, doc, OnSnapShot, updateDoc } from 'firebase/firestore';

const Formulario = () => {
    const [fruta, setFruta] = useState ('')
    const [descripcion, setDescripcion] = useState ('')
    const [listaFrutas, setListaFrutas] = useState ([])
    const [modoEdicion, setModoEdicion] = useState (false)
    const [id, setId] = useState ('')

    const guardarFrutas = async(e) => {
        e.preventDefault ()
        try {
            const data = await addDoc(collection(db, 'frutas'),{
                nombreFruta: fruta,
                nombreDescripcion: descripcion
            })
            setListaFrutas([
                ...listaFrutas,
                {nombreFruta: fruta, nombreDescripcion: descripcion, id:data.id}
            ])

            setFruta ('')
            setDescripcion ('')

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>ACTIVIDAD 20%</h1>
            <hr />
            <div className="row">
                <div className='col-8'>
                    <h4 className="text-center">Listado de Frutas</h4>
                    <ul className="list-group">
                        {

                        }
                    </ul>
                </div>

                
            

            <div className="col-4">
                <h4 className="text-center">
                    Agregar Frutas
                </h4>
                <form onSubmit="guardarFrutas">
                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Ingrese Fruta'
                    value={fruta} 
                    onChange= {(e)=>setFruta(e.target.value)}/>
                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Ingrese Descripción'
                    value={descripcion} 
                    onChange= {(e)=>setDescripcion(e.target.value)}/>

                    <button 
                        type='submit'
                        className='btn btn-primary btn-lock'>
                        Agregar
                    </button>
                </form>
            </div>
            </div>

        </div>
    )
}

export default Formulario