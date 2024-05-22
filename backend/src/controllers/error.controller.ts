import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { router } from '../utils/router.util';

export const errorGet: IHandlerResponse = async (req, res) => {
    res.render(router('404'), {
        view: { title: 'Libros | Página no encontrada' }
    });
};
