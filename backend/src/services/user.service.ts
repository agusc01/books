import { envConfig } from '../config/env.config';
import { User } from '../models/classes/user.class';
import { Env } from '../models/enums/env.enum';
import { IResponseDb } from '../models/interfaces/response-db.interface';
import { IUser } from '../models/interfaces/user.interface';
import { takeMsgError } from '../utils/takeMsgError.util';

require('dotenv').config();

const msgErrorLoginUser = envConfig(Env.DB_MSG_ERROR_LOGIN_USER);
const msgErrorCreate = envConfig(Env.DB_MSG_ERROR_CREATE);
const msgErrorRead = envConfig(Env.DB_MSG_ERROR_READ);

export const getOneUserByEmail = async (email: string): Promise<IResponseDb<IUser | string>> => {
    try {
        const user = await User.findOne({ 'email': { $eq: email } });
        if (!user) { throw new Error(`${msgErrorLoginUser}`); }
        return { isError: false, data: user };
    } catch (e: any) {
        console.log({ a: e });
        return { isError: true, data: `${msgErrorRead} ${takeMsgError(e)}.` };
    } finally { }
};

export const getOneUserById = async (id: string): Promise<IResponseDb<IUser | string>> => {
    try {
        const user = await User.findById(id);
        if (!user) { throw new Error(`${msgErrorLoginUser}`); }
        return { isError: false, data: user };
    } catch (e: any) {
        return { isError: true, data: takeMsgError(e) };
    } finally { }
};

export const saveOneUser = async (user: IUser): Promise<IResponseDb<IUser | string>> => {
    try {
        const newUser = new User(user);
        newUser.save();
        return { isError: false, data: newUser };
    } catch (e: any) {
        return { isError: true, data: `${msgErrorCreate} ${takeMsgError(e)}.` };
    } finally { }
};