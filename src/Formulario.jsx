import React, {useState, useEffect } from 'react'
import {db} from './firebase';//'db'
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

const Formulario = () => {
    const [nombre, setNombre] = useState ('')
    const [apellido, setApellido] = useState ('')
    const [identificacion, setIdentificacion] = useState ('')
    const [grado, setGrado] = useState ('')
    const [acumulado, setAcumulado] = useState ('')
    const [observaciones, setObservaciones] = useState ('')
    const [estado, setEstado] = useState ('')
    const [listaEstudiantes, setListaEstudiantes] = useState ([])
    const [modoEdicion, setModoEdicion] = useState (false)
    const [id, setId] = useState ('')


    useEffect (()=>{
        const obtenerDatos = async () => {
            try{
                await onSnapshot (collection(db, "estudiantes"), (query)=>{ /*frutas, cambiar en base de datos FIRBASE por estudiantes*/
                    setListaEstudiantes(query.docs.map((doc)=>({...doc.data(), id:doc.id})))
                })
            }catch(error){
                console.log(error)
            }
        }
        obtenerDatos ();
    }, [])

    const eliminar = async id=>{
        try{
            await deleteDoc(doc(db, 'estudiantes', id))
        }catch(error){
            console.log(error)
        }
    }

    const guardarEstudiantes = async(e) => {
        e.preventDefault ()
        try {
            const data = await addDoc(collection(db, 'estudiantes'),{
                campoNombre: nombre,
                campoApellido: apellido,
                campoIdentificacion: identificacion,
                campoGrado: grado,
                campoAcumulado: acumulado,
                campoObservaciones: observaciones,
                campoEstado: estado
            })
            setListaEstudiantes([
                ...listaEstudiantes,
                {campoNombre: nombre, campoApellido: apellido, campoIdentificacion: identificacion, campoGrado: grado, campoAcumulado: acumulado, campoObservaciones: observaciones, campoEstado: estado, id:data.id}
            ])

            setNombre ('')
            setApellido ('')
            setIdentificacion ('')
            setGrado ('')
            setAcumulado ('')
            setObservaciones ('')
            setEstado ('')

        }catch(error){
            console.log(error)
        }
    }

    const editar = item =>{
        setNombre (item.campoNombre)
        setApellido(item.campoApellido)
        setIdentificacion (item.campoIdentificacion)
        setGrado (item.campoGrado)
        setAcumulado (item.campoAcumulado)
        setObservaciones (item.campoObservaciones)
        setEstado (item.campoEstado)
        setId(item.id)
        setModoEdicion(true)
    }

    const editarEstudiantes = async (e) => {
        e.preventDefault()
        try{
            const docRef = doc(db, 'estudiantes', id);
            await updateDoc(docRef, {
                campoNombre: nombre, /*cambié estudiante por nombre*/
                campoApellido:apellido,
                campoIdentificacion: identificacion, 
                campoGrado: grado, 
                campoAcumulado: acumulado, 
                campoObservaciones: observaciones, 
                campoEstado: estado
            })

            const nuevoArray = listaEstudiantes.map(
                item => item.id === id ? {id: id, campoNombre:nombre, campoApellido:apellido, campoIdentificacion: identificacion, campoGrado: grado, campoAcumulado: acumulado, campoObservaciones: observaciones, campoEstado: estado} : item 
            )
            
            setListaEstudiantes(nuevoArray)
            setNombre('')
            setApellido('')
            setIdentificacion ('')
            setGrado ('')
            setAcumulado ('')
            setObservaciones ('')
            setEstado ('')
            setId('')
            setModoEdicion(false)

        }catch(error){
            console.log(error)
        }
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setNombre ('')
        setApellido ('')
        setIdentificacion ('')
        setGrado ('')
        setAcumulado ('')
        setObservaciones ('')
        setEstado ('')
        setId ('')
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center'>ACTIVIDAD 20%</h1>
            <hr />
            <div className="row">
                <div className='col-8'>
                    <h4 className="text-center">Listado Estudiantes</h4>
                    <ul className="list-group">
                        {
                            listaEstudiantes.map(item => (
                                <li className= "list-group-item" key={item.id}>
                                    <span className="lead">{item.campoNombre} - {item.campoApellido} - {item.campoIdentificacion} - {item.campoGrado} - {item.campoAcumulado} - {item.campoObservaciones} - {item.campoEstado}</span>
                                    <button className="btn btn-danger btn=sm float-end mx-2"
                                    onClick={()=>eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn=sm float-end mx-2"
                                    onClick={()=>editar(item)}>Editar</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                
            

            <div className="col-4">
                <h4 className="text-center">
                    {
                        modoEdicion ? 'Editar estudiante' : 'Agregar nuevo Estudiante'
                    }
                </h4>
                <form onSubmit={modoEdicion ? editarEstudiantes : guardarEstudiantes}> 
                    <input type="text" 
                    Classname="form-control mb-2 center" 
                    placeholder='Nombre estudiante'
                    value={nombre} 
                    onChange= {(e)=>setNombre(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Apellido estudiante'
                    value={apellido} 
                    onChange= {(e)=>setApellido(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Identificación estudiante'
                    value={identificacion} 
                    onChange= {(e)=>setIdentificacion(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Grado actual'
                    value={grado} 
                    onChange= {(e)=>setGrado(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Acumulado académico'
                    value={acumulado} 
                    onChange= {(e)=>setAcumulado(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Observaciones'
                    value={observaciones} 
                    onChange= {(e)=>setObservaciones(e.target.value)}/>

                    <input type="text" 
                    Classname="form-control mb-2" 
                    placeholder='Estado'
                    value={estado} 
                    onChange= {(e)=>setEstado(e.target.value)}/>

                    {
                        modoEdicion ?
                        (
                            <>
                                <button
                                className='btn btn-warning btn-block'
                                on='submit'>Editar</button>
                                <button
                                className='btn btn-dark btn-block mx-2'
                                onClick= {()=>cancelar()}>Cancelar</button>
                            </>
                        )
                        :
                        
                    <button 
                        type='submit'
                        className='btn btn-primary btn-block'>
                        Agregar
                    </button>
                    }
                </form>
                
            </div>
            </div>

        </div>
    )
}

export default Formulario