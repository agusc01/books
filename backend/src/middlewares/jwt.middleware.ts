import { Request, Response } from "express";
import { IToast } from "../models/interfaces/toast.interface";
import { JWTGetPayLoad, JWTSetToken } from "../services/jwt.service";
import { localsSetLogged } from "../services/locals.service";
import { sessionSetIsLogged } from "../services/session.service";
import { getOneUserById } from "../services/user.service";
import { router } from "../utils/router.util";
import { flashToasts } from "../utils/scripts.util";


export const JWTMiddleware = async (req: Request, res: Response, next: any): Promise<unknown> => {

    const resp = await JWTGetPayLoad(req);
    console.log({ resp });

    if (resp.isError) {
        const { _id } = resp.data as any;
        console.log({ _id });

        if (!_id) {
            flashToasts(req, [{
                text: 'No tiene token valido',
                type: 'warning'
            }]);
            return res.redirect(router('/auth/iniciar-sesion'));
        }

        const respUser = await getOneUserById(_id);

        if (respUser.isError || !respUser.data) {
            flashToasts(req, [{
                text: 'Ya no existe el usuario',
                type: 'error'
            }]);
            return res.redirect(router('/auth/iniciar-sesion'));
        }



        JWTSetToken(res, '');
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

        flashToasts(req, [toast]);
        return res.redirect(router('/auth/iniciar-sesion'));
    }

    next();
    return;

};