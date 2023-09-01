import postRoutes from './src/routes/index.js';
import express, { urlencoded } from "express";
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors()); //Uso de cors, para poder conectarse sin problemas
app.use(postRoutes);

app.listen(4000)

console.log("Funcionando")