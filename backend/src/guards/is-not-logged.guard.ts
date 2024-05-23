import { IGuard } from "../models/interfaces/guard.interface";
import { sessionGetLogged } from "../services/session.service";
import { renderTo } from "../utils/renderTo.util";
import { setToasts } from "../utils/scripts.util";

export const isNotLoggedGuard: IGuard = async (req, res, next) => {

    if (sessionGetLogged(req)) {
        setToasts(res, [{
            text: 'Usted ya ha iniciado sesión',
            type: 'warning'
        }]);

        return renderTo(req, res, '/libro/listar');
    }

    return next();
};