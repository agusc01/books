import { IGuard } from "../models/interfaces/guard.interface";
import { JWTSetToken } from "../services/jwt.service";
import { sessionGetIsLogged } from "../services/session.service";
import { router } from "../utils/router.util";
import { flashToasts } from "../utils/scripts.util";

export const isNotLoggedGuard: IGuard = async (req, res, next) => {

    if (sessionGetIsLogged(req)) {
        flashToasts(req, [{
            text: 'Usted ya ha iniciado sesión',
            type: 'warning'
        }]);
        JWTSetToken(res, '');

        return res.redirect(router('/libro/listar'));
    }



    return next();
};