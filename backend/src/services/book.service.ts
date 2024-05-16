import { db } from '../config/db.config';
import { envConfig } from '../config/env.config';
import { Env } from '../models/enums/env.enum';
import { IBook } from '../models/interfaces/book.interface';
import { IResponseDb } from '../models/interfaces/response-db.interface';

require('dotenv').config();

const msg_error_read = envConfig(Env.DB_MSG_ERROR_READ);
const msg_error_create = envConfig(Env.DB_MSG_ERROR_CREATE);
const msg_error_update = envConfig(Env.DB_MSG_ERROR_UPDATED);
const msg_error_delete = envConfig(Env.DB_MSG_ERROR_DELETE);
const table = envConfig(Env.DB_TABLE_BOOKS);

export const getAllBooks = async (): Promise<IResponseDb<IBook[] | string>> => {
    try {
        const query = `SELECT * FROM ${table};`;
        const [rows] = await db.query(query);
        return { isError: false, data: rows };
    } catch (e: any) {
        const msg = parseMsg(e?.message as string);
        return { isError: true, data: `${msg_error_read} ${msg}.` };
    } finally { }
};

export const getOneBook = async (id: string): Promise<IResponseDb<IBook | string>> => {
    try {
        const query = `SELECT * FROM ${table} WHERE id = ?;`;
        const [rows] = await db.query(query, [id]);

        if ((rows as IBook[]).length == 0) {
            throw new Error(`El libro con el id ${id} no existe`);
        }

        return { isError: false, data: rows[0] };
    } catch (e: any) {
        const msg = parseMsg(e?.message as string);
        return { isError: true, data: `${msg_error_read} ${msg}.` };
    } finally { }
};


export const saveOnebook = async ({ img, price, title, year }: IBook): Promise<IResponseDb<IBook | string>> => {
    try {
        const atributes = envConfig(Env.DB_TABLE_BOOKS_ATRIBUTES);
        const query = `INSERT INTO ${table} ${atributes} VALUES (?,?,?,?);`;
        const [rows] = await db.query(query, [img, price, title, year]);
        return { isError: false, data: rows };
    } catch (e: any) {
        const msg = parseMsg(e?.message as string);
        return { isError: true, data: `${msg_error_create} ${msg}.` };
    } finally { }
};


export const updateOneBook = async ({ img, price, title, year, id }: IBook): Promise<IResponseDb<IBook | string>> => {
    try {

        if (!id) { throw new Error(`Se necesita el ID`); }
        const resp = (await getOneBook(id));
        if (resp.isError) { throw new Error(resp.data as string); }

        const query = `UPDATE ${table} SET img = ? , price = ? , title = ? , year = ? WHERE id = ?;`;
        const [rows] = await db.query(query, [img, price, title, year, id]);
        return { isError: false, data: rows };

    } catch (e: any) {
        const msg = parseMsg(e?.message as string);
        return { isError: true, data: `${msg_error_update} ${msg}.` };
    } finally { }
};


export const deleteOneBook = async (id: string): Promise<IResponseDb<IBook | string>> => {
    try {

        if (!id) { throw new Error(`Se necesita el ID`); }
        const resp = (await getOneBook(id));
        if (resp.isError) { throw new Error(resp.data as string); }

        const query = `DELETE FROM ${table} WHERE id = ?;`;
        const [rows] = await db.query(query, id);
        return { isError: false, data: resp.data };

    } catch (e: any) {
        const msg = parseMsg(e?.message as string);
        return { isError: true, data: `${msg_error_delete} ${msg}.` };
    } finally { }
};


const parseMsg = (msg: string): string => {
    return msg
        .replaceAll('"', " ")
        .replaceAll('\\', " ")
        .replaceAll("'", " ");
};