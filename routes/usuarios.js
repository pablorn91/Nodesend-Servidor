import express from 'express';
const router = express.Router();
import { nuevoUsuario } from '../controllers/usuarioController.js';
import { check } from 'express-validator';

router.post('/',
    [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'Agrega un email válido').isEmail(),
      check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    ],
nuevoUsuario);

export default router;