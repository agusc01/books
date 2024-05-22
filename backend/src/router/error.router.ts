import { Router } from 'express';
import { errorGet } from '../controllers/error.controller';
import { router } from "../utils/router.util";

export const errorRouter = Router();

errorRouter.all(router('/'), errorGet);

