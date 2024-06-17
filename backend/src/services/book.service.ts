import { envConfig } from '../config/env.config';
import { Book } from '../models/classes/book.class';
import { Env } from '../models/enums/env.enum';
import { IBook } from '../models/interfaces/book.interface';
import { IResponseDb } from '../models/interfaces/response-db.interface';
import { takeMsgError } from '../utils/takeMsgError.util';

require('dotenv').config();

const msgErrorRead = envConfig(Env.DB_MSG_ERROR_READ);
const msgErrorCreate = envConfig(Env.DB_MSG_ERROR_CREATE);
const msgErrorUpdate = envConfig(Env.DB_MSG_ERROR_UPDATED);
const msgErrorDelete = envConfig(Env.DB_MSG_ERROR_DELETE);

export const getAllBooks = async (): Promise<IResponseDb<IBook[] | string>> => {
    try {
        const books = await Book.find();
        return { isError: false, data: books };
    } catch (e: any) {
        return { isError: true, data: `${msgErrorRead} ${takeMsgError(e)}.` };
    } finally { }
};

export const getOneBook = async (id: string): Promise<IResponseDb<IBook | string>> => {
    try {
        const book = await Book.findById(id);
        if (!book) {
            throw new Error(`El libro con el id ${id} no existe`);
        }
        return { isError: false, data: book };
    } catch (e: any) {
        return { isError: true, data: `${msgErrorRead} ${takeMsgError(e)}.` };
    } finally { }
};


export const saveOneBook = async (book: IBook): Promise<IResponseDb<IBook | string>> => {
    try {
        const newBook = await Book.create(book);
        return { isError: false, data: newBook };
    } catch (e: any) {
        return { isError: true, data: `${msgErrorCreate} ${takeMsgError(e)}.` };
    } finally { }
};


export const updateOneBook = async (book: IBook): Promise<IResponseDb<IBook | string>> => {
    try {
        const bookFound = await Book.findById(book._id);
        if (!bookFound) {
            throw new Error(`El libro con el id ${book._id} no existe`);
        }
        await bookFound.updateOne(book);
        return { isError: false, data: { ...bookFound, ...book } };
    } catch (e: any) {
        return { isError: true, data: `${msgErrorUpdate} ${takeMsgError(e)}.` };
    } finally { }
};


export const deleteOneBook = async (id: string): Promise<IResponseDb<IBook | string>> => {
    try {
        const book = await Book.findById(id);
        if (!book) {
            throw new Error(`El libro con el id ${id} no existe`);
        }
        const deletedRows = await book.deleteOne();
        if (deletedRows.deletedCount === 0) {
            throw new Error(`No se pudo eliminar el libro con el id ${id}`);
        }
        return { isError: false, data: book };
    } catch (e: any) {
        return { isError: true, data: `${msgErrorDelete} ${takeMsgError(e)}.` };
    } finally { }
};