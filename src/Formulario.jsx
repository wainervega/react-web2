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
    const [imagen, setImagen] = useState ('')
    const [listaEstudiantes, setListaEstudiantes] = useState ([])
    const [modoEdicion, setModoEdicion] = useState (false)
    const [id, setId] = useState ('')

    const obtenerImg = async ()=>{
        try{
            const {url}= await fetch('https://picsum.photos/200/300')
            console.log(url)
            return url;
        }catch(error){
            console.log(error)
        }
    }

    useEffect (()=>{
        const obtenerDatos = async () => {
            try{
                await onSnapshot (collection(db, "estudiantes"), (query)=>{ 
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
        const url = await obtenerImg()
        console.log(url)
        setImagen(url)     

        try {
            
            const data = await addDoc(collection(db, 'estudiantes'),{
                campoImagen: url,
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
                {campoImagen: url, campoNombre: nombre, campoApellido: apellido, campoIdentificacion: identificacion, campoGrado: grado, campoAcumulado: acumulado, campoObservaciones: observaciones, campoEstado: estado, id:data.id}
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
        setImagen (item.campoImagen)
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
        const url = await obtenerImg()
        console.log(url)
        setImagen(url) 
        console.log(imagen) 
        try{
            const docRef = doc(db, 'estudiantes', id);
            await updateDoc(docRef, {
                campoImagen: url,
                campoNombre: nombre,
                campoApellido:apellido,
                campoIdentificacion: identificacion, 
                campoGrado: grado, 
                campoAcumulado: acumulado, 
                campoObservaciones: observaciones, 
                campoEstado: estado
            })

            const nuevoArray = listaEstudiantes.map(
                item => item.id === id ? {id: id, campoImagen:url, campoNombre:nombre, campoApellido:apellido, campoIdentificacion: identificacion, campoGrado: grado, campoAcumulado: acumulado, campoObservaciones: observaciones, campoEstado: estado} : item 
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
            
            <h1 className='text-center'>BASE DE DATOS ESTUDIANTES</h1>
            <hr />
            <div className="row" >
                <div className='col-8 d-flex flex-column align-items-center'>
                    <h4 className="text-center">Listado Estudiantes</h4>
                    <ul className='list-group col-10'>
                        {
                            listaEstudiantes.map(item => (
                                <li className= "list-group-item" key={item.id}>
                                    <div className='d-flex flex-column align-items-center'>
                                        <img className= 'col-4'src={item.campoImagen} alt="IMAGEN" />
                                    
                                    <span className="lead">{item.campoNombre} - {item.campoApellido} - {item.campoIdentificacion} - {item.campoGrado} - {item.campoAcumulado} - {item.campoObservaciones} - {item.campoEstado}</span>
                                    <button className="btn btn-danger btn=sm float-end mx-2 mb-2 col-4"
                                    onClick={()=>eliminar(item.id)}>Eliminar</button>
                                    <button className="btn btn-warning btn=sm float-end mx-2 col-4"
                                    onClick={()=>editar(item)}>Editar</button>
                                    </div>
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
                    <input type="text" maxLength={20}
                    className="form-control mb-2 center" 
                    placeholder='Nombre estudiante'
                    required
                    value={nombre} 
                    onChange= {(e)=>setNombre(e.target.value)}/>

                    <input type="text" maxLength={20}
                    className="form-control mb-2" 
                    placeholder='Apellido estudiante'
                    required
                    value={apellido} 
                    onChange= {(e)=>setApellido(e.target.value)}/>

                    <input type="number" max={9999999999}
                    className="form-control mb-2"
                    placeholder='Identificación estudiante'
                    required
                    value={identificacion} 
                    onChange= {(e)=>setIdentificacion(e.target.value)}/>

                    {/* <input type="text" 
                    className="form-control mb-2" 
                    placeholder='Grado actual'
                    value={grado} 
                    onChange= {(e)=>setGrado(e.target.value)}/> */}

                    <select
                    type="text"
                    className="form-select mb-2"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setGrado(e.target.value)}
                    value={grado}
                    >
                    <option value="">Seleccione Grado</option>
                    <option value="Primero">Primero</option>
                    <option value="Segundo">Segundo</option>
                    <option value="Tercero">Tercero</option>
                    <option value="Cuarto">Cuarto</option>
                    <option value="Quinto">Quinto</option>
                    </select>

                    <input type="number" step="0.01" min="10.0" max="100.0" 
                    className="form-control mb-2" 
                    placeholder='Acumulado académico'
                    required
                    value={acumulado} 
                    onChange= {(e)=>setAcumulado(e.target.value)}/>

                    {/* <input type="text" 
                    className="form-control mb-2" 
                    placeholder='Observaciones'
                    value={observaciones} 
                    onChange= {(e)=>setObservaciones(e.target.value)}/> */}

                    <select
                    type="text"
                    className="form-select mb-2"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setObservaciones(e.target.value)}
                    value={observaciones}
                    >
                    <option value="">Seleccione observación</option>
                    <option value="Bajo">Bajo</option>
                    <option value="Basico">Básico</option>
                    <option value="Alto">Alto</option>
                    <option value="Superior">Superior</option>
                    </select>

                    {/* <input type="text" 
                    className="form-control mb-2" 
                    placeholder='Estado'
                    value={estado} 
                    onChange= {(e)=>setEstado(e.target.value)}/> */}

                    <select
                    type="text"
                    className="form-select mb-2"
                    aria-label="Default select example"
                    required
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                    >
                    <option value="">Seleccione estado</option>
                    <option value="Reprobado">Reprobado</option>
                    <option value="Aprobado">Aprobado</option>
                    <option value="Nivelacion">Nivelación</option>
                    </select>

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