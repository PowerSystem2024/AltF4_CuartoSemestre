import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Conteiner, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { register, handleSubmit, formState:{errors}} = useForm();
  const { signin, errors:loginErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) {
      navigate("/tareas");
    }
  });
  return (
    <Conteiner className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        {
          loginErrors && loginErrors.map((error) => (
            <p className="text-red-500 text-center mb-2">{error}</p>
          ))
        }
        <h1 className="text-4xl font-bold my-2 text-center">
          Iniciar Sesión
        </h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Ingrese su email" {...register("email", { required: true })} />
          {
            errors.email && <p className="text-red-500">Este campo es requerido</p>
          }
          <Label htmlFor="password">Contraseña</Label>
          <Input type="password" placeholder="Ingrese su contraseña" {...register("password", { required: true })} />
          {
            errors.password && <p className="text-red-500">Este campo es requerido</p>
          }
          <Button>Ingresar</Button>
        </form>

        <div className="flex justify-between my-4">
          <p>¿No tienes cuenta?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Registrarse
            </Link>
          </p>
        </div>
      </Card>
    </Conteiner>
  );
}

export default LoginPage;
