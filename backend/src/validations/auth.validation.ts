import { body } from "express-validator";

const mailValidation = body('email')
    .isEmail()
    .withMessage('Necesito que ingrese un correo válido');

const passValidation = body('password')
    .isLength({ min: 6 })
    .withMessage('La constraseña tener al menos 6 caracteres')
    .isAlphanumeric()
    .withMessage('La contraseña debe contener letras y/o números.');


export const loginValidation = [
    mailValidation,
    passValidation
];