import { Router } from "express";
import { apiAllBooksGET, apiCreateBooksPOST, apiDeleteBookDELETE, apiOneBookGET, apiUpdateBookPATCH } from "../controllers/api.controller";
import { router } from "../utils/router.util";

export const apiRouter = Router();

apiRouter.get(router('/libro/listar'), apiAllBooksGET);
apiRouter.get(router('/libro/listar/:id'), apiOneBookGET);
apiRouter.post(router('/libro/crear'), apiCreateBooksPOST);
apiRouter.patch(router('/libro/modificar/:id'), apiUpdateBookPATCH);
apiRouter.delete(router('/libro/eliminar/:id'), apiDeleteBookDELETE);
