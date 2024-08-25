import { Router } from "express";
import { verificarMiddleware } from "../middleware/autentificacionUsuario.js";
import { crearRecordatorio, editarRecordatorio, eliminarRecordatorio, leerRecordatorio } from "../controllers/controladorRecordatorio.js";

const router = Router()

//Crear recordatorio
router.post("/",verificarMiddleware, crearRecordatorio)
router.get("/",verificarMiddleware, leerRecordatorio)
router.patch("/:id_recordatorio",verificarMiddleware, editarRecordatorio)
router.delete("/:id_recordatorio",verificarMiddleware, eliminarRecordatorio)


export default router