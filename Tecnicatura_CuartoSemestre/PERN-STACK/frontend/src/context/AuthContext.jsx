import { createContext, useContext, useState, useEffect, use } from "react";
import Cookie from "js-cookie";
import axios from "../api/axios.js";
import { set } from "react-hook-form";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState([]);

    // 🔹 LOGIN
    const signin = async (data) => {
        try {
            const res = await axios.post("/signin", data,);
            console.log(res.data);
            setUser(res.data);
            setIsAuth(true);
            return res.data;
        } catch (error) {
            console.error(error);
            // 🔹 Manejo de errores
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    };

    // 🔹 REGISTER
    const signup = async (data) => {
        try {
            const res = await axios.post("/signup", data,);
            setUser(res.data);
            setIsAuth(true);
            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message]);
        }
    };

    const signout = async () => {
        const res = await axios.post("/signout");
        setUser(null);
        setIsAuth(false);
        return res.data;
    }

    useEffect(() => {
        setLoading(true);
        if (Cookie.get("token")) {
            axios.get("/profile",
            ).then((res) => {
                setUser(res.data);
                setIsAuth(true);
                setLoading(false);
            }).catch((error) => {
                setIsAuth(false);
                setUser(null);
                console.error(error);
            });
        setLoading(false);    
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() =>{
            setErrors(null);
        }, 4000);
        return () => {
            clearTimeout(timeout);
        };
    },[errors]);
    return (
        <AuthContext.Provider
            value={{
                user,
                isAuth,
                errors,
                signin,
                signup,
                signout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
