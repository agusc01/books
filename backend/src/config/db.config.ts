import { Env } from "../models/enums/env.enum";
import { envConfig } from "./env.config";

require('dotenv').config();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: String(envConfig(Env.DB_HOST)),
    user: String(envConfig(Env.DB_USER)),
    password: String(envConfig(Env.DB_PASS)),
    database: String(envConfig(Env.DB_NAME)),
    port: Number(envConfig(Env.DB_PORT)),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

pool.getConnection(async (error: any, connection: any) => {
    if (error) {
        console.log('\n-----------------------------------------------------');
        console.error('Error al obtener una conexión:', error);
        console.log('-----------------------------------------------------\n');
    } else {
        console.log('\n-----------------------------------------------------');
        console.log(`Conexión exitosa a la base de datos. PORT: ${envConfig(Env.DB_PORT)}`);
        console.log('-----------------------------------------------------\n');
        connection.release();
    }
});

export const db = pool.promise();
