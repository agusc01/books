import { IGuard } from "../models/interfaces/guard.interface";
import { sessionGetIsLogged } from "../services/session.service";
import { renderTo } from "../utils/renderTo.util";
import { setToasts } from "../utils/scripts.util";


export const isLoggedGuard: IGuard = async (req, res, next) => {

    if (sessionGetIsLogged(req)) {
        return next();
    }

    setToasts(res, [{
        text: 'Usted necesita iniciar sesión',
        type: 'warning'
    }]);

    return renderTo(req, res, '/auth/iniciar-sesion');
};