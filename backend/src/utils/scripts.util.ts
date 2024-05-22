import { Response } from "express";
import { IAlert } from '../models/interfaces/alert.interface';
import { IToast } from '../models/interfaces/toast.interface';
import { ValidRouter } from "../models/types/valid-router.type";


export const setToasts = (res: Response, toasts: IToast[]): void => {
    // TODO: put spanish title
    toasts.forEach(toast => {
        toast.title = toast.title ? toast.title : toast.type;
    });
    res.locals.toasts = toasts;
};

export const setAlerts = (res: Response, alerts: IAlert[]): void => {
    // TODO: put spanish title
    alerts.forEach(alert => {
        alert.title = alert.title ? alert.title : alert.type;
    });
    res.locals.alerts = alerts;
};


export const setNewHref = (res: Response, newHref: ValidRouter): void => {
    res.locals.newHref = newHref;
};