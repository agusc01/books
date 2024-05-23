import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { TValidRouter } from '../models/types/valid-router.type';
import { router } from '../utils/router.util';

require('dotenv').config();

export const errorGet: IHandlerResponse = async (req, res) => {
    return res.render(router('404'), {
        view: { title: 'Libros | Página no encontrada' }
    });
};

export const errorAPI: IHandlerResponse = async (req, res) => {

    const protocol = envConfig(Env.APP_PROTOCOL);
    const host = envConfig(Env.APP_HOST);
    const port = envConfig(Env.APP_PORT);
    const url = `${protocol}://${host}:${port}/api`;
    const path: TValidRouter = 'libro/listar';

    return res.status(500).send({
        msg: 'Libros | Página no encontrada',
        href: `${url}/${path}`
    });
};
