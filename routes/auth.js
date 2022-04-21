import express from 'express';
const router = express.Router();
import { autenticarUsuario, usuarioAutenticado } from '../controllers/authController.js';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';

router.post('/',
    [
        check('email', 'Agrega un email Válido').isEmail(),
        check('password', 'El password no puede ir vacío').not().isEmpty()
    ],
autenticarUsuario);


router.get('/',
    auth,
    usuarioAutenticado);

export default router;