import { Router } from "express";
import { crearUsuario, iniciarSesion } from "../controllers/controladorUsuario.js";

const router = Router()

//Register
router.post("/register", crearUsuario)


//Login
router.post("/login", iniciarSesion)

export default router