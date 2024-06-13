
import bcrypt from 'bcrypt';
import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { IUser } from '../models/interfaces/user.interface';
import { JWTGenerate, JWTSetToken } from '../services/jwt.service';
import { localsSetLogged } from '../services/locals.service';
import { sessionSetIsLogged } from '../services/session.service';
import { getOneUserByEmail, saveOneUser } from '../services/user.service';
import { renderTo } from '../utils/renderTo.util';
import { router } from '../utils/router.util';
import { setToasts } from '../utils/scripts.util';


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
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
        return loginGET(req, res);
    }

    const user = resp.data as IUser;
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        setToasts(res, [{
            title: 'No ha iniciado sesión',
            text: String(envConfig(Env.DB_MSG_ERROR_LOGIN_USER)),
            type: 'error',
        }]);
        return loginGET(req, res);
    }


    const { _id } = user;
    const payload = await JWTGenerate({ email, _id });

    if (payload.isError) {
        setToasts(res, [{
            text: payload.data,
            type: 'error',
        }]);
        return renderTo(req, res, '/auth/iniciar-sesion');
    }

    const token = payload.data;

    localsSetLogged(res, true);
    sessionSetIsLogged(req, true);
    JWTSetToken(res, token);

    setToasts(res, [{
        text: 'Ha iniciado sesión',
        type: 'success',
    }]);
    return renderTo(req, res, '/libro/listar');
};

export const logoutGET: IHandlerResponse = async (req, res) => {

    localsSetLogged(res, false);
    sessionSetIsLogged(req, false);
    setToasts(res, [{
        text: 'Se ha cerradó sessión',
        type: 'success'
    }]);

    return renderTo(req, res, '/auth/iniciar-sesion');
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
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
        return registerGET(req, res);
    }

    setToasts(res, [{ type: 'success', text: 'Se creó el usuario' }]);
    return renderTo(req, res, '/auth/iniciar-sesion');
};
