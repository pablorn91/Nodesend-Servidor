import Usuario from '../models/Usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { validationResult } from "express-validator";

dotenv.config();

const autenticarUsuario = async (req, res, next) => {

 //Revisar si hay errores
 //Mostrar Mensajes de error de express validator
 const errores = validationResult(req);

 if(!errores.isEmpty()) {
     return res.status(400).json({errores: errores.array()});
 }

 //Buscar el usuario apra ver si está registrado
 const { email, password } = req.body;
 const usuario = await Usuario.findOne({ email });
 
 if (!usuario) {
     res.status(401).json({msg: 'El usuario No existe'});
     return next();
 }

 //Verificar el password y autenticar el usuario
 if(bcrypt.compareSync(password, usuario.password)) {
     //Crear JWT
    const token = jwt.sign({
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
    }, process.env.SECRETA, {
        expiresIn: '8h'
    });

    res.json({token})

 } else {
     res.status(401).json({msg: 'Password Incorrecto'});
     return next();
 }
}

const usuarioAutenticado = async (req, res, next ) => {
   res.json({usuario: req.usuario});
}

export { autenticarUsuario, usuarioAutenticado }