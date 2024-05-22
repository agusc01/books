import { Router } from "express";
import { createBookGET, createBookPOST, deleteBookDELETE, listBooksGET, updateBookGET, updateBookPUT } from "../controllers/book.controller";
import { router } from "../utils/router.util";

export const bookRouter = Router();

bookRouter.get(router('/listar'), listBooksGET);
bookRouter.get(router('/crear'), createBookGET);
bookRouter.post(router('/crear'), createBookPOST);
bookRouter.get(router('/modificar/:id'), updateBookGET);
bookRouter.put(router('/modificar/:id'), updateBookPUT);
bookRouter.delete(router('/eliminar/:id'), deleteBookDELETE);

