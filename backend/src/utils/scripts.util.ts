import { Request, Response } from "express";
import { IConfirmSweet } from "../models/interfaces/confirm-sweet.interface";
import { ISpanishTitles } from "../models/interfaces/spanish-titles.interface";
import { IToast } from '../models/interfaces/toast.interface';
import { TValidRouter } from "../models/types/valid-router.type";

const spanishTitles: ISpanishTitles = {
    'error': 'Error',
    'success': 'Éxito',
    'warning': 'Advertencia',
    'info': 'Información',
    'question': 'Pregunta',
};

export const flashToast = (req: Request, toast: IToast) => {
    (req as any).flash(toast.type, toast.text);
};

export const flashToasts = (req: Request, toasts: IToast[]) => {
    toasts.forEach(toast => { flashToast(req, toast); });
};

export const setConfirm = (res: Response, confirms: IConfirmSweet[]): void => {
    confirms.forEach(confirm => {
        confirm.title = confirm.title ? confirm.title : spanishTitles[confirm.type];
    });
    res.locals.confirms = confirms;
};

export const setNewHref = (res: Response, newHref: TValidRouter): void => {
    res.locals.newHref = newHref;
};