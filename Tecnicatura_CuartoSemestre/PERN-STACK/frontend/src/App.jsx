import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import TareasPage from "./pages/TareasPage.jsx";
import TareaFormPage from "./pages/TareaFormPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import { Conteiner } from "./components/ui/Conteiner.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { TareasProvider } from "./context/TareasContext.jsx";

function App() {
  const { isAuth, loading } = useAuth();

   /*if (loading) {
      return <h1>Cargando...</h1>
  }*/
  return (
    <>
      <Navbar />
      <Conteiner className="py-5">
        <Routes>
          {/* Rutas públicas */}
          <Route
            element={<ProtectedRoute isAllowed={!isAuth} redirecTo="/tareas" />}
          >
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Rutas protegidas (requieren login) */}
          <Route
            element={<ProtectedRoute isAllowed={isAuth} redirecTo="/login" />}
          >
            <Route path="/perfil" element={<ProfilePage />} />

            {/* Envolvemos con el provider de tareas */}
            <Route
              element={
                <TareasProvider>
                  <Outlet />
                </TareasProvider>
              }
            >
              <Route path="/tareas" element={<TareasPage />} />
              <Route path="/tarea/crear" element={<TareaFormPage />} />
              <Route path="/tarea/:id/editar" element={<TareaFormPage />} />
            </Route>
          </Route>

          {/* Página 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Conteiner>
    </>
  );
}

export default App;





 