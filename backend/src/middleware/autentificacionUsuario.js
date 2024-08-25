import { prisma } from "../db/prisma.js";
import jwt from "jsonwebtoken";

async function verificarMiddleware(req, res,next){

    let token = req.headers.authorization

    if (!token || !token.startsWith('Bearer')) {
        return res.status(400).send("ERROR DE TOKEN")
    }

    token = token.split("Bearer ")
    token = token[1]

    try {
        const{id_usuario} = jwt.verify(token, process.env.SECRETA)
        const usuario = await prisma.usuario.findFirst({where: {id_usuario}})

        if (!usuario) return res.status(400).json({messsage: "ERROR"})

        req.usuario = usuario


    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Token no valido"})
    }
    next()
}


export {
    verificarMiddleware
}