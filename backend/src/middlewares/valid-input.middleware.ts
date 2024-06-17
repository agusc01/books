import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { IToast } from "../models/interfaces/toast.interface";
import { flashToast } from "../utils/scripts.util";

export const validInputMiddleware = (req: Request, res: Response, next: any): void => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array();
        errorsArray.forEach(error => {
            const mensaje: IToast = { text: error?.msg, type: 'error' };
            flashToast(req, mensaje);
            console.log({ mensaje });
        });
        const url = req.originalUrl;
        return res.redirect(url);
    }

    next();
};