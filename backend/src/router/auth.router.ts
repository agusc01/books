import { Router } from "express";
import { loginGET, loginPOST, logoutGET, reactLoginPOST, reactRegisterPOST, registerGET, registerPOST } from "../controllers/auth.controller";
import { isLoggedGuard } from "../guards/is-logged.guard";
import { isNotLoggedGuard } from "../guards/is-not-logged.guard";
import { JWTMiddleware } from "../middlewares/jwt.middleware";
import { validInputMiddleware } from "../middlewares/valid-input.middleware";
import { router } from "../utils/router.util";
import { loginValidation, registerValidation } from "../validations/auth.validation";

export const authRouter = Router();

authRouter.get(router('/iniciar-sesion'), isNotLoggedGuard, loginGET);
authRouter.post(router('/iniciar-sesion'), isNotLoggedGuard, loginValidation, validInputMiddleware, loginPOST);
authRouter.post(router('/react/iniciar-sesion'), isNotLoggedGuard, loginValidation, validInputMiddleware, reactLoginPOST);
authRouter.get(router('/registrarse'), isNotLoggedGuard, registerGET);
authRouter.post(router('/registrarse'), isNotLoggedGuard, registerValidation, validInputMiddleware, registerPOST);
authRouter.post(router('/react/registrarse'), isNotLoggedGuard, registerValidation, validInputMiddleware, reactRegisterPOST);
authRouter.get(router('/cerrar-sesion'), isLoggedGuard, JWTMiddleware, logoutGET);