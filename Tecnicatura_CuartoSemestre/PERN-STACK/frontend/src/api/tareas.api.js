import axios from "./axios.js";

export const crearTareaRequest = (tarea) => axios.post("/tareas", tarea)

export const listarTareasRequest =() => axios.get("/tareas")

export const listarTareaRequest =(id) => axios.get(`/tareas/${id}`)

export const eliminarTareaRequest =(id) => axios.delete(`/tareas/${id}`)

export const actualizarTareaRquest = (id,tarea) => axios.put(`/tareas/${id}`, tarea)
