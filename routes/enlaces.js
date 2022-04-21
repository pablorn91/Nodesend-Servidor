import express from 'express';
const router = express.Router();
import { nuevoEnlace, obtenerEnlace, todosEnlaces, tienePassword, verificarPassword } from '../controllers/enlacesController.js';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

router.post('/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty()
    ],
    auth,
    nuevoEnlace);

router.get('/',
    todosEnlaces
)

router.get('/:url', 
    tienePassword,
    obtenerEnlace
);

router.post('/:url',
    verificarPassword,
    obtenerEnlace
);

export default router;