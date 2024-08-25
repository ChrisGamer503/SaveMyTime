import express from "express"
import usuarioRuta from "../src/routes/usuarioRuta.js"
import recordatorioRuta from "../src/routes/recordatorioRuta.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use("/usuarios", usuarioRuta)
app.use("/recordatorios", recordatorioRuta)

app.listen(5000)