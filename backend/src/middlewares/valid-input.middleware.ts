import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IToast } from "../models/interfaces/toast.interface";
import { TValidRouter } from "../models/types/valid-router.type";
import { renderTo } from "../utils/renderTo.util";
import { setToasts } from '../utils/scripts.util';

export const validInputMiddleware = (req: Request, res: Response, next: any): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        const mensajes = errorsArray.map(error => {
            const mensaje: IToast = {
                text: `${(error as any)?.msg}`,
                type: 'error'
            };
            return mensaje;
        });
        setToasts(res, mensajes);
        const url = req.originalUrl as TValidRouter;
        return renderTo(req, res, url);
    }

    next();
};