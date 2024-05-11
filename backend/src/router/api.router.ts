import { Router } from "express";
import { AllBooksGET, createBooksPOST, deleteBookDELETE, oneBookGET, updateBookPATCH } from "../controllers/api.controller";
import { router } from "../utils/router.util";

export const apiRouter = Router();

apiRouter.get(router('/libro/listar'), AllBooksGET);
apiRouter.get(router('/libro/listar/:id'), oneBookGET);
apiRouter.post(router('/libro/crear'), createBooksPOST);
apiRouter.patch(router('/libro/modificar/:id'), updateBookPATCH);
apiRouter.delete(router('/libro/eliminar/:id'), deleteBookDELETE);
