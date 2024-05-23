import { Router } from "express";
import { loginGET, loginPOST, logoutGET } from "../controllers/auth.controller";
import { isLoggedGuard } from "../guards/is-logged.guard";
import { isNotLoggedGuard } from "../guards/is-not-logged.guard";
import { validInputMiddleware } from "../middlewares/valid-input.middleware";
import { router } from "../utils/router.util";
import { loginValidation } from "../validations/auth.validation";

export const authRouter = Router();

authRouter.get(router('/iniciar-sesion'), isNotLoggedGuard, loginGET);
authRouter.post(router('/iniciar-sesion'), isNotLoggedGuard, loginValidation, validInputMiddleware, loginPOST);
authRouter.get(router('/cerrar-sesion'), isLoggedGuard, logoutGET);