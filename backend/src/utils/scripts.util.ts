import { Response } from "express";
import { IAlert } from '../models/interfaces/alert.interface';
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

export const setToasts = (res: Response, toasts: IToast[]): void => {
    toasts.forEach(toast => {
        toast.title = toast.title ? toast.title : spanishTitles[toast.type];
    });
    res.locals.toasts = toasts;
};

export const setAlerts = (res: Response, alerts: IAlert[]): void => {
    alerts.forEach(alert => {
        alert.title = alert.title ? alert.title : spanishTitles[alert.type];
    });
    res.locals.alerts = alerts;
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