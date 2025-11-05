import {BiTask, BiUserCircle} from "react-icons/bi"
import {MdAddTask} from "react-icons/md"
export const PublicRoutes=[
  { name: 'About', path: '/about' },
  { name: 'Login', path: '/login' },
  { name: 'Register', path: '/register' },
]

export const PrivateRoutes = [

  { name: 'Tareas', path: '/tareas', icon: <BiTask/> },
  { name: 'Agregar', path: '/tarea/crear',icon: <MdAddTask/> },
  { name: 'Perfil', path: '/perfil',icon: <BiUserCircle/> },
]