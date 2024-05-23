import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { localsSetLogged, sessionSetLogged } from '../services/session.service';
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

    if (email === 'test@test.com' && password === '123123') {

        setToasts(res, [{
            text: 'Ha iniciado sesión',
            type: 'success',
        }]);

        localsSetLogged(res, true);
        sessionSetLogged(req, true);

        return renderTo(req, res, '/libro/listar');
    }

    setToasts(res, [{
        title: 'No ha iniciado sesión',
        text: 'Correo y/o contraseña incorrecta',
        type: 'error',
    }]);

};

export const logoutGET: IHandlerResponse = async (req, res) => {
    console.log('asdfs');
    localsSetLogged(res, false);
    sessionSetLogged(req, false);
    setToasts(res, [{
        text: 'Se ha cerradó sessión',
        type: 'success'
    }]);

    return renderTo(req, res, '/auth/iniciar-sesion');
};
