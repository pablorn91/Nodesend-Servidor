import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import multer from "multer";
import shortid from "shortid";
import fs from 'fs';
import Enlace from '../models/Enlace.js';


const subirArchivo = async (req, res, next ) => {

    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: multer.diskStorage({
            destination: ( req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`)
            }
        })
    }

    const upload = multer(configuracionMulter).single('archivo');

    upload(req, res, async (error) => {
        console.log(req.file);

        if(!error) {
            res.json({archivo: req.file.filename})
        } else {
            console.log(error);
            return next();
        }
    })
}
const eliminarArchivo = async (req, res ) => {
    console.log(req.archivo);

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
        console.log('Archivo Eliminado')
    } catch (error) {
        console.log(error);
    }
}

//Descarga un archivo
const descargar = async (req, res, next) => {

    //Obtiene el enlace
    const { archivo } = req.params;
    const enlace = await Enlace.findOne({ nombre: archivo});

    console.log(enlace);

    const archivoDescarga = __dirname +'/../uploads/'+ archivo;
    res.download(archivoDescarga);

    //Eliminar el archivo y la entrada de la base de datos

    //Si las descargas son iguales a 1 borrar la entrada y borrar el archivo
    const { descargas, nombre } = enlace;

    if(descargas === 1) {
        
        //Eliminar el archivo
        req.archivo = nombre;
        
        //Eliminar la entrada de la base de datos
        await enlace.deleteOne();

        next();
        
    } else {
        //Si las descargas son > a 1 entonces restamos una descarga
        enlace.descargas--;
        await enlace.save();
    }
}

export { subirArchivo, eliminarArchivo, descargar }