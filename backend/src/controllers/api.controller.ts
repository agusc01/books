import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IBook } from '../models/interfaces/book.interface';
import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { deleteOneBook, getAllBooks, getOneBook, saveOnebook, updateOneBook } from '../services/book.service';


require('dotenv').config();
const dbError = envConfig(Env.DB_MSG_ERROR);


export const allBooksGET: IHandlerResponse = async (req, res) => {
    const resp = await getAllBooks();

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    return res.status(200).send({ libros: resp.data });
};


export const oneBookGET: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const resp = await getOneBook(id);

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    return res.status(200).send({ libro: resp.data });
};


export const createBooksPOST: IHandlerResponse = async (req, res) => {
    const { price, title, year } = req.body;
    const book: IBook = { price, title, year, img: 'fake-url' };
    const resp = await saveOnebook(book);

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    // book.id = (resp.data as any).insertId;
    return res.status(201).send({ libro: book });
};


export const updateBookPATCH: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const { price, title, year } = req.body;
    const book: IBook = { price, title, year, img: 'fake-url', id };

    const resp = await updateOneBook(book);

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    return res.status(200).send({ libro: book });

};


export const deleteBookDELETE: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const resp = await deleteOneBook(id);

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    return res.status(200).send({ libro: resp.data });
}

