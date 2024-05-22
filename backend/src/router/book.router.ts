import { Router } from "express";
import { createBookGET, createBookPOST, deleteBookDELETE, listBooksGET, updateBookGET, updateBookPUT } from "../controllers/book.controller";
import { validInputMiddleware } from "../middlewares/valid-input.middleware";
import { router } from "../utils/router.util";
import { createBookValidation, updateBookvalidation } from "../validations/book.validation";

export const bookRouter = Router();

bookRouter.get(router('/listar'), listBooksGET);
bookRouter.get(router('/crear'), createBookGET);
bookRouter.post(router('/crear'), createBookValidation, validInputMiddleware, createBookPOST);
bookRouter.get(router('/modificar/:id'), updateBookGET);
bookRouter.put(router('/modificar/:id'), updateBookvalidation, validInputMiddleware, updateBookPUT);
bookRouter.delete(router('/eliminar/:id'), deleteBookDELETE);

