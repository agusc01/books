import { Request, Response } from "express";
import { createBookGET, listBooksGET } from "../controllers/book.controller";
import { errorGet } from "../controllers/error.controller";
import { ValidRouter } from "../models/types/valid-router.type";
import { setNewHref } from "./scripts.util";

export const renderTo = (req: Request, res: Response, validRouter: ValidRouter): void => {
    switch (validRouter) {
        case '/libro/crear':
            setNewHref(res, validRouter);
            return createBookGET(req, res);
        case '/libro/listar':
            setNewHref(res, validRouter);
            return listBooksGET(req, res);
        default:
            return errorGet(req, res);
    }
};