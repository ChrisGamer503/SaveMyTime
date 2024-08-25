import z from "zod"
import { prisma } from "../db/prisma.js"

const crearRecordatorio = async (req, res) => {
    const recordatorioEsquema = z.object({
        nombre_recordatorio: z.string(),
        fecha_inicio: z.preprocess((arg) => new Date(arg), z.date()),
        fecha_final: z.preprocess((arg) => new Date(arg), z.date()),
        prioridad: z.string(),
    });

    const datos = req.body;

    try {
        const datosValidados = recordatorioEsquema.parse(datos);
        
        if (!req.usuario || !req.usuario.id_usuario) {
            return res.status(401).send("Usuario no autenticado");
        }

        // Agregar el usuario_id al objeto de datos validados
        datosValidados.usuario_id = req.usuario.id_usuario;

        const recordatorioCreado = await prisma.recordatorio.create({
            data: datosValidados,
        });

        return res.status(201).json(recordatorioCreado);
    } catch (error) {
        console.log(error);
        return res.status(400).send("ERROR");
    }
};

const leerRecordatorio = async(req,res) =>{
    try {
        
        const recordatorioLeido = await prisma.recordatorio.findMany()
        return res.status(200).json(recordatorioLeido)

    } catch (error) {
        return res.status(400).send("error")
    }
}

const editarRecordatorio = async(req,res) =>{
    const recordatorioEsquema = z.object({
        nombre_recordatorio: z.string().optional(),
        fecha_inicio: z.preprocess((arg) => new Date(arg), z.date()).optional(),
        fecha_final: z.preprocess((arg) => new Date(arg), z.date()).optional(),
        prioridad: z.string().optional(),
    });

    const datos = req.body
    let {id_recordatorio} = req.params
    id_recordatorio = parseInt(id_recordatorio,10)

    if (isNaN(id_recordatorio)) {
        return res.status(400).send("ID de recordatorio no válido");
    }


    try {
        const datosValidados = recordatorioEsquema.parse(datos)

        const recordatorioEditado = await prisma.recordatorio.update({where: { id_recordatorio }, data:datosValidados})
        return res.status(201).json(recordatorioEditado);

    } catch (error) {
        console.log(error);
        return res.status(400).send("ERROR");
    }
}

const eliminarRecordatorio = async(req,res)=>{
    
    try {
        let {id_recordatorio} = req.params
        id_recordatorio = parseInt(id_recordatorio,10)

        if (isNaN(id_recordatorio)) {
            return res.status(400).send("ID de recordatorio no válido");
        }
        const recordatorioEliminado = await prisma.recordatorio.delete({where:{id_recordatorio}})
        return res.status(200).json(recordatorioEliminado)
    } catch (error) {
        console.log(error);
        return res.status(400).send("ERROR");
    }

}

export{
    crearRecordatorio,
    leerRecordatorio,
    editarRecordatorio,
    eliminarRecordatorio
}