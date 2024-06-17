import { IGuard } from "../models/interfaces/guard.interface";

export const isNotLoggedGuard: IGuard = async (req, res, next) => {

    // if (sessionGetIsLogged(req)) {
    //     flashToasts(req, [{
    //         text: 'Usted ya ha iniciado sesión',
    //         type: 'warning'
    //     }]);
    //     console.log('lulu');

    //     return res.redirect(router('/libro/listar'));
    // }



    return next();
};