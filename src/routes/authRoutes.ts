import express from 'express';
import { register } from '../controllers/authController';
import { check } from 'express-validator';
import { errores } from '../middelwares/errores';
import { registeredUser } from '../helpers/registeredUser';

const router = express.Router();
//ruta para el registro
router.post('register', [
    //uso express-validator
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("email", "Email es obligatorio").isEmail(), 
    check("password","El password es obligatorio").isLength({min: 6}),
    check("email").custom(registeredUser),
    //verificar si el correo exisite -> crear modelo usuario e interface
    errores
],register)

export default router