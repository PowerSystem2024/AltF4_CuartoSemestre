import { Card, Input, Label, TextArea, Button } from "../components/ui"
import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useTareas } from "../context/TareasContext"

function TareaFormPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const params = useParams();
  console.log(params);

  const navigate = useNavigate();
  const { crearTarea, cargarTarea, editarTarea, error: tareasError } = useTareas()
  const onSubmit = handleSubmit(async (data) => {

    if (!params.id) {
      const tarea = await crearTarea(data);
      navigate("/tareas");
    } else {
      const tarea = await editarTarea(params.id, data);
      navigate("/tareas");
    }
  })

  useEffect(() => {
    if (params.id) {
      cargarTarea(params.id).then(tarea => {
        setValue("titulo", tarea.titulo);
        setValue("descripcion", tarea.descripcion);
      })
    }
  }, [params.id, setValue, cargarTarea])
  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {
          tareasError.map((error, i) => (
            <p className="text-red-500" key={i}>{error}</p>
          ))
        }
        <h2 className="text-3xl font-bold my-4">{params.id ? "Editar Tarea" : "Crear Tarea"}</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="titulo">Titulo</Label>
          <Input type="text" placeholder="Titulo" autoFocus {...register("titulo", { required: true })} />
          {errors.titulo && <p className="text-red-500">El titulo es obligatorio</p>}
          <Label htmlFor="descripcion">Descripcion</Label>
          <TextArea type="text" placeholder="Descripcion" rows={3} {...register("descripcion")}></TextArea>
          <Button>{params.id ? "Aceptar" : "Guardar"}</Button>
        </form>
      </Card>
    </div>
  )
}

export default TareaFormPage