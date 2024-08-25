import z from "zod"
import { prisma } from "../db/prisma.js"
import Jwt from "jsonwebtoken"

const crearUsuario = async (req, res) => {
    
    const usuarioEsquema = z.object({
        nombre_usuario: z.string(),
        correo: z.string().email(),
        contrase_a: z.string()
    })

    //Obtener datos
    const datos = req.body

    try {
        //Validar
        usuarioEsquema.parse(datos)
        const validacionUsuario = await prisma.usuario.findFirst({where: {correo: datos.correo}})

        if (validacionUsuario) {
            return res.status(401).send("El usuario ya existe")
        }

        //Insertar datos
        const usuarioCreado = await prisma.usuario.create({data: datos})
        return res.status(201).json(usuarioCreado)

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error")
    }

}


const iniciarSesion = async (req, res) => {
    const usuarioEsquema = z.object({
        correo: z.string().email(),
        contrase_a: z.string()
    })

    //Obtener datos
    

    try {
        const datos = req.body
        
        const validacionUsuario = await prisma.usuario.findFirst({where: {correo: datos.correo}})
        
        usuarioEsquema.parse(datos)
        if (!validacionUsuario) {
            return res.status(401).send("El usuario no existe")
        }

        if (validacionUsuario.contrase_a !== datos.contrase_a) {
            return res.status(401).send("La contraseña es incorrecta")
        }

        const payload = { id_usuario: validacionUsuario.id_usuario }
        const token = Jwt.sign(payload, process.env.SECRETA)

        return res.status(200).json({token})

    } catch (error) {
        console.log(error)
        return res.status(400).send("Error")
    }

}


export {
    crearUsuario,
    iniciarSesion
}