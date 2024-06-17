import { Request, Response } from "express";
import { IToast } from "../models/interfaces/toast.interface";
import { JWTGetPayLoad, JWTSetToken } from "../services/jwt.service";
import { localsSetIsLogged } from "../services/locals.service";
import { sessionSetIsLogged } from "../services/session.service";
import { getOneUserById } from "../services/user.service";
import { router } from "../utils/router.util";
import { flashToasts } from "../utils/scripts.util";

const cleanAllCookies = (req: Request, res: Response): void => {
    JWTSetToken(res, '');
    localsSetIsLogged(res, false);
    sessionSetIsLogged(req, false);
};

export const JWTMiddleware = async (req: Request, res: Response, next: any): Promise<unknown> => {

    const resp = await JWTGetPayLoad(req);

    if (resp.isError) {
        const { _id } = resp.data as any;

        if (!_id) {
            flashToasts(req, [{
                text: 'No tiene token valido',
                type: 'warning'
            }]);

            cleanAllCookies(req, res);
            return res.redirect(router('/auth/iniciar-sesion'));
        }

        const respUser = await getOneUserById(_id);

        if (respUser.isError || !respUser.data) {
            flashToasts(req, [{
                text: 'Ya no existe el usuario',
                type: 'error'
            }]);

            cleanAllCookies(req, res);
            return res.redirect(router('/auth/iniciar-sesion'));
        }

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

        flashToasts(req, [toast]);
        cleanAllCookies(req, res);
        return res.redirect(router('/auth/iniciar-sesion'));
    }

    next();
    return;

};