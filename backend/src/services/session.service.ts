import { Request } from "express";
import { envConfig } from "../config/env.config";
import { Env } from "../models/enums/env.enum";

const session = require('cookie-session');

export const initSession = () => {
    return session({
        secret: String(envConfig(Env.SESSION_NAME)),
        sameSite: 'Lax',
    });
};

export const sessionSetLogged = (req: Request, isLogged: boolean): void => {
    (req as any).session.isLogged = isLogged;
};

export const sessionGetLogged = (req: Request): boolean => {
    return (req as any).session.isLogged;
};

