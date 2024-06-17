
import bcrypt from 'bcrypt';
import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { IUser } from '../models/interfaces/user.interface';
import { JWTGenerate, JWTSetToken } from '../services/jwt.service';
import { localsSetIsLogged } from '../services/locals.service';
import { sessionSetIsLogged } from '../services/session.service';
import { getOneUserByEmail, saveOneUser } from '../services/user.service';
import { router } from '../utils/router.util';
import { flashToasts } from '../utils/scripts.util';


require('dotenv').config();
const dbError = envConfig(Env.DB_MSG_ERROR);


export const loginGET: IHandlerResponse = async (req, res) => {

    return res.render(router('auth/iniciar-sesion'), {
        view: {
            title: 'Libros | Iniciar Sesión',
        },
    });
};

export const loginPOST: IHandlerResponse = async (req, res) => {

    const { email, password } = req.body;
    const resp = await getOneUserByEmail(email);

    if (resp.isError) {
        flashToasts(req, [{ type: 'error', text: resp.data as string }]);
        return loginGET(req, res);
    }

    const user = resp.data as IUser;
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        flashToasts(req, [{
            title: 'No ha iniciado sesión',
            text: String(envConfig(Env.DB_MSG_ERROR_LOGIN_USER)),
            type: 'error',
        }]);
        return loginGET(req, res);
    }


    const { _id } = user;
    const payload = await JWTGenerate({ email, _id });

    if (payload.isError) {
        flashToasts(req, [{
            text: payload.data,
            type: 'error',
        }]);
        return res.redirect(router('/auth/iniciar-sesion'));
    }

    const token = payload.data;

    console.log('lolo');

    localsSetIsLogged(res, true);
    sessionSetIsLogged(req, true);
    JWTSetToken(res, token);

    flashToasts(req, [{
        text: 'Ha iniciado sesión',
        type: 'success',
    }]);
    return res.redirect(router('/libro/listar'));
};

export const logoutGET: IHandlerResponse = async (req, res) => {

    JWTSetToken(res, '');
    localsSetIsLogged(res, false);
    sessionSetIsLogged(req, false);

    flashToasts(req, [{
        text: 'Se ha cerradó sessión',
        type: 'success'
    }]);

    return res.redirect(router('/auth/iniciar-sesion'));
};


export const registerGET: IHandlerResponse = async (req, res) => {
    return res.render(router('auth/registrarse'), {
        view: {
            title: 'Libros | Registrarse',
        }
    });
};

export const registerPOST: IHandlerResponse = async (req, res) => {

    const { email, password } = req.body;

    const salt = envConfig(Env.BCRYPT_SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    const resp = await saveOneUser({ email, password: hashedPassword });

    if (resp.isError) {
        flashToasts(req, [{ type: 'error', text: resp.data as string }]);
        return registerGET(req, res);
    }

    flashToasts(req, [{ type: 'success', text: 'Se creó el usuario' }]);
    return res.redirect(router('/auth/iniciar-sesion'));
};
