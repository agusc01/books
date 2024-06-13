import { Request, Response } from "express";
import { IToast } from "../models/interfaces/toast.interface";
import { JWTGetPayLoad } from "../services/jwt.service";
import { localsSetLogged } from "../services/locals.service";
import { sessionSetIsLogged } from "../services/session.service";
import { renderTo } from "../utils/renderTo.util";
import { setToasts } from "../utils/scripts.util";


export const JWTMiddleware = async (req: Request, res: Response, next: any): Promise<unknown> => {

    const resp = await JWTGetPayLoad(req);

    if (!resp.isError) {
        next();
        return;
    }

    localsSetLogged(res, false);
    sessionSetIsLogged(req, false);

    let toast: IToast = {
        text: resp.data as string,
        type: 'error'
    };

    if ((resp.data as string)?.includes(' exp  claim timestamp check failed. ')) {
        toast = {
            text: 'Ha expirado la sessión, debe ingresar nuevamente',
            type: 'info'
        };
    }

    setToasts(res, [toast]);
    return renderTo(req, res, '/auth/iniciar-sesion');

};