import Enlace from "../models/Enlace.js";
import shortid from "shortid";
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";

const nuevoEnlace = async ( req, res ) => {
    //Revisar si hay errores
    const errores = validationResult(req);

    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    //Crear un objeto de enlace
    const { nombre, nombre_original } = req.body;

    const enlace = new Enlace();

    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
   
    //Si el usuario está autenticado
    if (req.usuario) {
        const { password, descargas } = req.body;

        //Asignar a enlace el número de descargas
        if ( descargas ) {
            enlace.descargas = descargas;
        }
        //Asignar password
        if (password) {
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash( password, salt );
        }

        //Asignar el autor
        enlace.autor = req.usuario.id;

    }

    //Almacenar en la BD
    try {
        await enlace.save();
        return res.json({msg: `${enlace.url}`});
        next();
    } catch (error) {
        console.log(error)
    }
}

//Obtiene un listado de todos los enlaces
const todosEnlaces = async (req, res) => {
    try {
       const enlaces = await Enlace.find({}).select('url -_id');
       res.json({enlaces}); 
    } catch (error) {
        console.log(error)
    }
}

//Retorna si el enlace tiene password o no
const tienePassword = async (req, res, next) => {

    const { url } = req.params;

    console.log(url);

    //Verificar si existe el enlace
    const enlace = await Enlace.findOne({url});

    if (!enlace) {
        res.status(404).json({msg: 'El enlace no existe'});
        return next();
    }

    if (enlace.password) {
        return res.json({password: true, enlace: enlace.url, archivo: enlace.nombre });
    }

    next();
}
//Verifica si el password es correcto
const verificarPassword = async (req, res, next) => {
    const { url } = req.params;
    const { password } = req.body;

    //Consultar por el enlace
    const enlace = await Enlace.findOne({url});

    //verificar el password
    if(bcrypt.compareSync(password, enlace.password)) {
        //Permitirle al usuario descargar el archivo
        next();
    } else {
        return res.status(401).json({msg: 'Password Incorrecto'})
    }


}

//Obtener el enlace 
const obtenerEnlace = async (req, res, next) => {

    const { url } = req.params;

    console.log(url);

    //Verificar si existe el enlace
    const enlace = await Enlace.findOne({url});

    if (!enlace) {
        res.status(404).json({msg: 'El enlace no existe'});
        return next();
    }

    //Si el enlace existe
    res.json({ archivo: enlace.nombre, password: false});

    next();

}


export { nuevoEnlace, todosEnlaces, obtenerEnlace, tienePassword, verificarPassword }