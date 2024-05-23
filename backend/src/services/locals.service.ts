import { Response } from "express";

export const localsSetLogged = (res: Response, isLogged: boolean): void => {
    res.locals.isLogged = isLogged;
};
export const localsGetLogged = (res: Response): void => {
    return res.locals.isLogged;
};