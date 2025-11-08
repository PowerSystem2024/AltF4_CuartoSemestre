
import { PrivateRoutes, PublicRoutes } from "./navigation.jsx";
import { Link, useLocation } from "react-router-dom"
import { Conteiner } from "../ui/Conteiner.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { twMerge } from "tailwind-merge"
import {BiLogOut} from "react-icons/bi"

function Navbar() {
    const location = useLocation();
    const { isAuth, signout, user } = useAuth();

    return (
        <nav className="bg-zinc-950 flex">
            <Conteiner className="flex justify-between items-center py-4">
                <Link to="/">
                    <h1 className="text-2xl font-bold text-white">Proyecto PERN</h1>
                </Link>
                <ul className=" flex gap-x-5 items-center justify-center">
                    {
                        isAuth ?
                            <>
                                {
                                    PrivateRoutes.map(({ name, path, icon }) => (
                                        <li key={name}>
                                            <Link to={path} className={twMerge("text-slate-300 bg-yellow-700 items-center flex px-3 py-1",
                                                location.pathname === path && "bg-yellow-500 px-3 py-1")}>
                                                {icon}<span className="hidden sm:block">{name}</span>
                                            </Link>
                                        </li>
                                    ))
                                }
                                <li className={twMerge("text-slate-300 items-center flex px-3 py-1 hover:cursor-pointer")} onClick={() => signout()}>
                                    <BiLogOut className="h-5 w-5"/> <span className="hidden sm:block"> Salir</span></li>
                                <li className="flex gap-x-2 items-center justify-center">
                                    <img src={user.gravatar} alt="" className="h-8 w-8 rounded-b-full" />
                                    <span className="font-medium">
                                        {user.name}
                                    </span>
                                </li>
                            </>
                            : PublicRoutes.map(({ name, path }) => (
                                <li className={twMerge("text-slate-300 bg-yellow-700 items-center flex px-3 py-1", `${location.pathname === path && "bg-yellow-500 px-3 py-1"}`)
                                } key={name}>
                                    <Link to={path}>{name}</Link>
                                </li>
                            ))
                    }
                </ul>
            </Conteiner>
        </nav>
    )
}

export default Navbar