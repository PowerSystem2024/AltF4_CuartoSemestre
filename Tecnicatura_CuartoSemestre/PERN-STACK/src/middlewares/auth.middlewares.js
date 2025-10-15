import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    const { token } = req.cookies; // Extraes el token de las cookies

    if (!token) {
        // 1. No hay token: Error de no autorizado
        return res.status(401).json({ message: "No autorizado" });
    }

    // 2. Hay token: Verificar si es válido
    jwt.verify(token, "xyz123", (err, decoded) => {
        if (err) {
            // Token inválido o expirado
            return res.status(403).json({ message: "Token no válido" });
        }
        
        // 3. Token Válido: Asignar el ID y continuar
        req.usuarioId = decoded.id;
        // ¡IMPORTANTE! Pasar al siguiente middleware/controller
        next(); 
    });
};