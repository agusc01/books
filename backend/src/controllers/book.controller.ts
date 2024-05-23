import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IHandlerResponse } from '../models/interfaces/handler-response.interface';
import { TValidRouter } from '../models/types/valid-router.type';
import { deleteOneBook, getAllBooks, getOneBook, saveOneBook, updateOneBook } from '../services/book.service';
import { renderTo } from '../utils/renderTo.util';
import { router } from '../utils/router.util';
import { setConfirm, setToasts } from '../utils/scripts.util';
import { IBook } from './../models/interfaces/book.interface';


require('dotenv').config();
const dbError = envConfig(Env.DB_MSG_ERROR);


export const listBooksGET: IHandlerResponse = async (req, res) => {

    const resp = await getAllBooks();

    if (resp.isError) {
        setToasts(res, [{ text: `${dbError}. ${resp.data}`, type: 'error' }]);
        return renderTo(req, res, '/404');
    }

    return res.render(router('libro/listar'), {
        view: { title: "Libros | Lista", },
        books: resp.data,
    });
};

export const createBookGET: IHandlerResponse = async (req, res) => {

    return res.render(router('libro/crear'), {
        view: { title: "Libros | Crear", },
        book: {},
        typeOfAction: 'Agregar',
        action: '/libro/crear' as TValidRouter
    });
};

export const createBookPOST: IHandlerResponse = async (req, res) => {

    const { price, title, year } = req.body;
    const book: IBook = { price, title, year, img: 'fake-url' };
    const resp = await saveOneBook(book);

    if (resp.isError) {
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
    } else {
        setToasts(res, [{ type: 'success', text: 'Se creó el libro' }]);
    }

    return createBookGET(req, res);
};

export const updateBookGET: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const resp = await getOneBook(id);

    if (resp.isError) {
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
        return renderTo(req, res, '/libro/listar');
    }

    return res.render(router('libro/crear'), {
        view: { title: "Libros | Modifcar", },
        typeOfAction: 'Modificar',
        book: resp.data as IBook,
        action: `${('/libro/modificar' as TValidRouter)}/${id}?_method=PUT`,
    });
};


export const updateBookPUT: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const { price, title, year } = req.body;
    const book: IBook = { price, title, year, img: 'fake-url', id };
    const resp = await updateOneBook(book);

    if (resp.isError) {
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
    } else {
        setToasts(res, [{ type: 'success', text: 'Se modificó el libro' }]);
    }

    return updateBookGET(req, res);
};

export const deleteBookConfirmationDELETE: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const resp = await getOneBook(id);
    if (resp.isError) {
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
        return renderTo(req, res, '/libro/listar');
    }

    setConfirm(res, [{
        type: 'question',
        text: `Título del libro: ${(resp.data as IBook).title}`,
        title: '¿Realmente quiere eliminar el libro?',
        newHref: `${'/libro/eliminar'}/${(resp.data as IBook).id}?_method=DELETE`,
        oldHref: '/libro/listar'
    }]);

    return listBooksGET(req, res);
};


export const deleteBookDELETE: IHandlerResponse = async (req, res) => {

    const id = req.params.id;
    const resp = await deleteOneBook(id);

    if (resp.isError) {
        setToasts(res, [{ type: 'error', text: resp.data as string }]);
    } else {
        setToasts(res, [{ type: 'success', text: 'Se eliminó el libro' }]);
    }

    return renderTo(req, res, '/libro/listar');
};
