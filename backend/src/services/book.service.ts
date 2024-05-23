import { envConfig } from '../config/env.config';
import { Book } from '../models/classes/book.class';
import { Env } from '../models/enums/env.enum';
import { IBook } from '../models/interfaces/book.interface';
import { IResponseDb } from '../models/interfaces/response-db.interface';
import { takeMsgError } from '../utils/takeMsgError.util';

require('dotenv').config();

const msg_error_read = envConfig(Env.DB_MSG_ERROR_READ);
const msg_error_create = envConfig(Env.DB_MSG_ERROR_CREATE);
const msg_error_update = envConfig(Env.DB_MSG_ERROR_UPDATED);
const msg_error_delete = envConfig(Env.DB_MSG_ERROR_DELETE);

export const getAllBooks = async (): Promise<IResponseDb<IBook[] | string>> => {
    try {
        const books = await Book.findAll();
        return { isError: false, data: books };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_read} ${takeMsgError(e)}.` };
    } finally { }
};

export const getOneBook = async (id: string): Promise<IResponseDb<IBook | string>> => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error(`El libro con el id ${id} no existe`);
        }
        return { isError: false, data: book };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_read} ${takeMsgError(e)}.` };
    } finally { }
};


export const saveOneBook = async (book: IBook): Promise<IResponseDb<IBook | string>> => {
    try {
        const newBook = await Book.create(book);
        return { isError: false, data: newBook };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_create} ${takeMsgError(e)}.` };
    } finally { }
};


export const updateOneBook = async (book: IBook): Promise<IResponseDb<IBook | string>> => {
    try {
        console.log({ book });
        const bookFound = await Book.findByPk(book.id);
        if (!bookFound) {
            throw new Error(`El libro con el id ${book.id} no existe`);
        }
        await bookFound.update(book);
        return { isError: false, data: book };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_update} ${takeMsgError(e)}.` };
    } finally { }
};


export const deleteOneBook = async (id: string): Promise<IResponseDb<IBook | string>> => {
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            throw new Error(`El libro con el id ${id} no existe`);
        }
        const deletedRows = await Book.destroy({ where: { id } });
        if (deletedRows === 0) {
            throw new Error(`No se pudo eliminar el libro con el id ${id}`);
        }
        return { isError: false, data: book };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_delete} ${takeMsgError(e)}.` };
    } finally { }
};