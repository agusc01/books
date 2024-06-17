import { Response } from "express";

export const localsSetIsLogged = (res: Response, isLogged: boolean): void => {
    res.locals.isLogged = isLogged;
};
export const localsGetIsLogged = (res: Response): void => {
    return res.locals.isLogged;
};