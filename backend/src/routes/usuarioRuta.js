import { Router } from "express";
import { verificarMiddleware } from "../middleware/autentificacionUsuario.js";
import { crearUsuario, iniciarSesion, perfil } from "../controllers/controladorUsuario.js";

const router = Router()

//Register
router.post("/register", crearUsuario)


//Login
router.post("/login", iniciarSesion)

router.get("/perfil",verificarMiddleware , perfil)

export default router