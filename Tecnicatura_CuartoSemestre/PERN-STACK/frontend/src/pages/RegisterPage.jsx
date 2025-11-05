import { useForm } from "react-hook-form";
import { Button, Card, Conteiner, Input, Label } from "../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  const { signup, errors: setUserErrors } = useAuth();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if (user) {
      navigate("/tareas");
    }

  });

  return (
    <Conteiner className="h-[calc(100vh-10rem)] flex justify-center items-center">
      <Card>
        {
          setUserErrors && setUserErrors.map((error) => (
            <p className="text-red-500 text-center mb-2">{error}</p>
          ))
        }
        <h2 className='text-2xl font-bold my-4'>Registro</h2>
        <form onSubmit={onSubmit}>
          <Label htmlFor="name">Nombre</Label>
          <Input placeholder="Ingrese su nombre" {...register("name", { required: true })} />
          {
            errors.name && <p className="text-red-500">El nombre es obligatorio</p>
          }
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Ingrese su mail"
            {...register("email", { required: true })}>
          </Input>
          {
            errors.email && <p className="text-red-500">El email es obligatorio</p>
          }
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" placeholder="Ingrese su contraseña"
            {...register("password", { required: true })}>
          </Input>
          {
            errors.password && <p className="text-red-500">La contraseña es obligatoria</p>
          }
          <Button>Registrarse</Button>
        </form>
        <div className="flex justify-between my-4">
          <p>¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-yellow-400 hover:underline">
              Iniciar sesión
            </Link>
          </p>

        </div>
      </Card>
    </Conteiner>

  )
}

export default RegisterPage