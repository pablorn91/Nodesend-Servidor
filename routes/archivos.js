import express from 'express';
const router = express.Router();
import { subirArchivo, descargar, eliminarArchivo } from '../controllers/archivosController.js';
import auth from '../middleware/auth.js';

router.post('/',
    auth,
    subirArchivo);

router.get('/:archivo',
    descargar,
    eliminarArchivo
)

export default router;