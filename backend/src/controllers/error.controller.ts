import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { router } from '../utils/router.util';

export const errorGet: IHandlerResponse = async (req, res) => {
    return res.render(router('404'), {
        view: { title: 'Libros | Página no encontrada' }
    });
};

export const errorAPI: IHandlerResponse = async (req, res) => {
    return res.status(500).send({ msg: 'Libros | Página no encontrada' });
};
