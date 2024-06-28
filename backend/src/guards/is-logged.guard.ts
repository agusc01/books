import { IGuard } from "../models/interfaces/guard.interface";
import { sessionGetIsLogged } from "../services/session.service";
import { router } from "../utils/router.util";
import { flashToasts } from "../utils/scripts.util";


export const isLoggedGuard: IGuard = async (req, res, next) => {

    if (sessionGetIsLogged(req)) {
        return next();
    }

    flashToasts(req, [{
        text: 'Usted necesita iniciar sesión',
        type: 'warning'
    }]);

    return res.redirect(router('/auth/iniciar-sesion'));
};

export const reactIsLoggedGuard: IGuard = async (req, res, next) => {

    if (sessionGetIsLogged(req)) {
        return next();
    }

    return res.status(500).send({ msg: 'no tiene credenciales' });
};