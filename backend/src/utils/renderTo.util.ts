import { Request, Response } from "express";
import { createBookGET, listBooksGET, updateBookGET } from "../controllers/book.controller";
import { errorGet } from "../controllers/error.controller";
import { ValidRouter } from "../models/types/valid-router.type";
import { setNewHref } from "./scripts.util";

export const renderTo = (req: Request, res: Response, validRouter: ValidRouter): void => {

    // * Sacar parametros
    validRouter = validRouter.split("?")[0] as ValidRouter;

    // * Sacar numeros (posibles ID)
    /*
    Explicación:
        \/\d+$:
        \/ coincide con el carácter /.
        \d+ coincide con uno o más dígitos.
        $ asegura que la coincidencia esté al final de la cadena. 
    */
    validRouter = validRouter.replace(/\/\d+$/, '') as ValidRouter;

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
        default:
            return errorGet(req, res);
    }
};