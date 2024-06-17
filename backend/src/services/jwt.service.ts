import { Request, Response } from "express";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { envConfig } from "../config/env.config";
import { Env } from "../models/enums/env.enum";
import { IResponseDb } from "../models/interfaces/response-db.interface";
import { IUser } from "../models/interfaces/user.interface";
import { takeMsgError } from "../utils/takeMsgError.util";

const jwtKey = String(envConfig(Env.JWT_PRIVATE_KEY));

export const JWTGenerate = async ({ _id, email }: Partial<IUser>): Promise<IResponseDb<string>> => {

    try {

        if (!_id) { throw new Error('No tenemos el _id del usuario'); }
        if (!email) { throw new Error('No tenemos el email del usuario'); }

        const jwtConstructor = new SignJWT({ _id, email });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime(String(envConfig(Env.JWT_TIME)))
            .sign(encoder.encode(jwtKey));

        return { data: jwt, isError: false };

    } catch (e: any) {
        return { isError: true, data: takeMsgError(e) };
    } finally { }

};

export const JWTGetPayLoad = async (req: any): Promise<IResponseDb<JWTPayload | string>> => {
    try {

        const jwt = JWTGetInCookie(req);

        if (!jwt) return { isError: true, data: 'No tiene autorización' };

        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(jwt, encoder.encode(jwtKey));

        return { isError: false, data: payload };
    } catch (e: any) {
        return { isError: true, data: takeMsgError(e) };
    } finally { }
};


export const JWTSetToken = (res: Response, token: string) => {
    res.cookie('token', token, { httpOnly: true, secure: true });
};

export const JWTGetInCookie = (req: Request): string => {
    return req.headers.cookie?.split('token=')[1] ?? '';
};