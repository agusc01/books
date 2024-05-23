import { Request, Response } from "express";
import { loginGET } from "../controllers/auth.controller";
import { createBookGET, listBooksGET, updateBookGET } from "../controllers/book.controller";
import { errorGet } from "../controllers/error.controller";
import { TValidRouter } from "../models/types/valid-router.type";
import { setNewHref } from "./scripts.util";

export const renderTo = (req: Request, res: Response, validRouter: TValidRouter): void => {

    // * Sacar parametros
    validRouter = validRouter.split("?")[0] as TValidRouter;

    // * Sacar numeros (posibles ID)
    /*
    Explicación:
        \/\d+$:
        \/ coincide con el carácter /.
        \d+ coincide con uno o más dígitos.
        $ asegura que la coincidencia esté al final de la cadena. 
    */
    validRouter = validRouter.replace(/\/\d+$/, '') as TValidRouter;

    switch (validRouter) {
        case '/libro/crear':
            setNewHref(res, validRouter);
            return createBookGET(req, res);
        case '/libro/modificar':
            setNewHref(res, validRouter);
            return updateBookGET(req, res);
        case '/libro/listar':
            setNewHref(res, validRouter);
            return listBooksGET(req, res);
        case '/auth/iniciar-sesion':
            setNewHref(res, validRouter);
            return loginGET(req, res);
        default:
            setNewHref(res, '/404');
            return errorGet(req, res);
    }
};