import express from 'express';
import conectarDB from './config/db.js';
import usuarioRouter from './routes/usuarios.js';
import authRouter from './routes/auth.js';
import enlacesRouter from './routes/enlaces.js';
import archivosRouter from './routes/archivos.js';
import cors from 'cors';

//crear el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

//Habilitar Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL    
}
app.use( cors(opcionesCors));

console.log('Comenzando Node Send')

//Puerto de la app
const port = process.env.PORT || 4000;

//Habilitar que se pueda leer JSON en el body correctamente
app.use(express.json());

//Habilitar carpeta publica
app.use(express.static('uploads'));

//Rutas de la app
app.use("/api/usuarios", usuarioRouter);
app.use("/api/auth", authRouter);
app.use("/api/enlaces", enlacesRouter);
app.use("/api/archivos", archivosRouter);

//Arrancar la app
app.listen(port, '0.0.0.0' , () => {
    console.log(`El servidor está funcionando en el puerto ${port}`)
})