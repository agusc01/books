import { envConfig } from '../config/env.config';
import { User } from '../models/classes/user.class';
import { Env } from '../models/enums/env.enum';
import { IResponseDb } from '../models/interfaces/response-db.interface';
import { IUser } from '../models/interfaces/user.interface';
import { takeMsgError } from '../utils/takeMsgError.util';

require('dotenv').config();

const msg_error_login_user = envConfig(Env.DB_MSG_ERROR_LOGIN_USER);
const msg_error_read = envConfig(Env.DB_MSG_ERROR_READ);
const msg_error_create = envConfig(Env.DB_MSG_ERROR_CREATE);
// const msg_error_update = envConfig(Env.DB_MSG_ERROR_UPDATED);
// const msg_error_delete = envConfig(Env.DB_MSG_ERROR_DELETE);

// export const getAllUsers = async (): Promise<IResponseDb<IUser[] | string>> => {
//     try {
//         const users = await User.findAll();
//         return { isError: false, data: users };
//     } catch (e: any) {
//         return { isError: true, data: `${msg_error_read} ${takeMsgError(e)}.` };
//     } finally { }
// };

// export const getOneUser = async (id: string): Promise<IResponseDb<IUser | string>> => {
//     try {
//         const user = await User.findByPk(id);
//         if (!user) {
//             throw new Error(`El usuario con el id ${id} no existe`);
//         }
//         return { isError: false, data: user };
//     } catch (e: any) {
//         return { isError: true, data: `${msg_error_read} ${takeMsgError(e)}.` };
//     } finally { }
// };

export const getOneUserByEmail = async (email: string): Promise<IResponseDb<IUser | string>> => {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) { throw new Error(`${msg_error_login_user}`); }
        return { isError: false, data: user };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_read} ${takeMsgError(e)}.` };
    } finally { }
};


export const saveOneUser = async (user: IUser): Promise<IResponseDb<IUser | string>> => {
    try {
        const newUser = await User.create(user);
        return { isError: false, data: newUser };
    } catch (e: any) {
        return { isError: true, data: `${msg_error_create} ${takeMsgError(e)}.` };
    } finally { }
};


// export const updateOneUser = async (user: IUser): Promise<IResponseDb<IUser | string>> => {
//     try {
//         console.log({ user });
//         const userFound = await User.findByPk(user.id);
//         if (!userFound) {
//             throw new Error(`El usuario con el id ${user.id} no existe`);
//         }
//         await userFound.update(user);
//         return { isError: false, data: user };
//     } catch (e: any) {
//         return { isError: true, data: `${msg_error_update} ${takeMsgError(e)}.` };
//     } finally { }
// };


// export const deleteOneUser = async (id: string): Promise<IResponseDb<IUser | string>> => {
//     try {
//         const user = await User.findByPk(id);
//         if (!user) {
//             throw new Error(`El usuario con el id ${id} no existe`);
//         }
//         const deletedRows = await User.destroy({ where: { id } });
//         if (deletedRows === 0) {
//             throw new Error(`No se pudo eliminar el usuario con el id ${id}`);
//         }
//         return { isError: false, data: user };
//     } catch (e: any) {
//         return { isError: true, data: `${msg_error_delete} ${takeMsgError(e)}.` };
//     } finally { }
// };