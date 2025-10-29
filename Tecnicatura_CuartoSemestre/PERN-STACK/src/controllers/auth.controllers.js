import { pool } from "../schemas/db.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import md5 from "md5";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rowCount === 0)
      return res.status(400).json({ message: "El correo no está registrado" });

    const validPassword = await bcrypt.compare(password, result.rows[0].password);
    if (!validPassword)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccessToken({ id: result.rows[0].id });

    // 🔹 cookie lista para localhost
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,       // 🔸 false en desarrollo (sin HTTPS)
      sameSite: "lax",     // 🔸 evita bloqueos entre 5173 y 3000
      path: "/",           // 🔸 garantiza que se envíe en todas las rutas
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    });

    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const gravatar = "https://www.gravatar.com/avatar/" + md5(email);

    const result = await pool.query(
      "INSERT INTO usuarios (name, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, gravatar]
    );

    const token = await createAccessToken({ id: result.rows[0].id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ message: "El correo ya está en uso" });
    }
    next(error);
  }
};

export const signout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  return res.json({ message: "Sesión cerrada" });
};

export const profile = async (req, res) => {
  const result = await pool.query("SELECT * FROM usuarios WHERE id = $1", [req.usuarioId]);
  return res.json(result.rows[0]);
};
