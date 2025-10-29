import { createContext, useContext, useState } from "react";
import { eliminarTareaRequest, listarTareasRequest, crearTareaRequest, listarTareaRequest,actualizarTareaRquest } from "../api/tareas.api"

const TareasContext = createContext();

export const useTareas = () => {
    const context = useContext(TareasContext)
    if (!context) {
        throw new error("useTareas debe estar dentro del proveedor TareasProvider")
    }
    return context;
}

export const TareasProvider = ({ children }) => {
    const [tareas, setTareas] = useState([]);
    const [error, setError] = useState([])

    const eliminarTarea = async (id) => {
        const res = await eliminarTareaRequest(id);
        if (res.status === 204) {
            setTareas(tareas.filter((tarea) => tarea.id !== id))
        }
        console.log(res);
    }

    const cargarTareas = async () =>{

    };

    const editarTarea = async (id, tarea) =>{
           try {
                const res = await actualizarTareaRquest(id,tarea);
                return res.data
           } catch (error) {
            if (error.response) {
                setError([error.response.data.message])   
            }
           }
    }
    const cargarTarea = async (id,tarea)=>{
        const res = await listarTareaRequest(id,tarea);
        return res.data;
    }


    const crearTarea = async (tarea) => {
        try {
            await crearTareaRequest(tarea);
            setTareas([...tareas, res.data]);
            return res.data;

        } catch (error) {
            if (error.response) {
                setError([error.response.data.message]);
            }
        }
    }

    const listarTareas = async () => {
        const res = await listarTareasRequest()
        setTareas(res.data);
    };
    return (
        <TareasContext.Provider value={{
            tareas, listarTareas, eliminarTarea, crearTarea, cargarTarea, error, editarTarea,
        }}>
            {children}
        </TareasContext.Provider>
    )
}
