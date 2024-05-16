import { Sequelize } from 'sequelize';
import { Env } from "../models/enums/env.enum";
import { envConfig } from "./env.config";

require('dotenv').config();

export const sequelize = new Sequelize({
    dialect: 'mysql',
    host: String(envConfig(Env.DB_HOST)),
    port: Number(envConfig(Env.DB_PORT)),
    username: String(envConfig(Env.DB_USER)),
    password: String(envConfig(Env.DB_PASS)),
    database: String(envConfig(Env.DB_NAME)),
});

export const testDataBaseWithSequelice = async () => {
    try {
        await sequelize.authenticate();
        console.log('\n-----------------------------------------------------');
        console.log(`Conexión exitosa a la base de datos. PORT: ${envConfig(Env.DB_PORT)}`);
        console.log('-----------------------------------------------------\n');
        await sequelize.sync();
        console.log('\n-----------------------------------------------------');
        console.log(`Tablas sincronizadas exitosamente`);
        console.log('-----------------------------------------------------\n');
    } catch (error) {
        console.log('\n-----------------------------------------------------');
        console.error('Error al conectar a la base de datos:', error);
        console.log('-----------------------------------------------------\n');
    } finally {
        // await sequelize.close();
    }
};