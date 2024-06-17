import { Request, Response } from "express";
import { loginGET, registerGET } from "../controllers/auth.controller";
import { createBookGET, listBooksGET, updateBookGET } from "../controllers/book.controller";
import { errorGet } from "../controllers/error.controller";
import { TValidRouter } from "../models/types/valid-router.type";
import { setNewHref } from "./scripts.util";

export const renderTo = (req: Request, res: Response, validRouter: TValidRouter): void => {

    let goTo = validRouter;

    // README: esto es por si se utiliza algun PUT, DELETE, etc
    const splitRouter = validRouter.split("?");
    if (splitRouter[1]) {
        const router = splitRouter[0].split("/");
        router.pop();
        goTo = router.join("/") as TValidRouter;
    }

    console.log({ goTo });

    switch (goTo) {
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
        case '/auth/registrarse':
            setNewHref(res, validRouter);
            return registerGET(req, res);
        default:
            setNewHref(res, '/404');
            return errorGet(req, res);
    }
};