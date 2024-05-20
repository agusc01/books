import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
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

    if (!req.body.img) { req.body.img = 'fake-url'; }
    const resp = await saveOnebook(req.body);

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    return res.status(201).send({ libro: resp.data });
};


export const updateBookPATCH: IHandlerResponse = async (req, res) => {

    if (!req.body.img) { req.body.img = 'fake-url'; }
    req.body.id = req.params.id;
    const resp = await updateOneBook(req.body);

    if (resp.isError) {
        const error = dbError + (resp.data as string);
        return res.status(500).send({ error });
    }

    return res.status(200).send({ libro: resp.data });
};


export const deleteBookDELETE: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const book = await deleteOneBook(id);

    if (book.isError) {
        const error = dbError + (book.data as string);
        return res.status(500).send({ error });
    }

    return res.status(200).send({ libro: book.data });
}

