
import express from 'express';
import { checkEnvironments, envConfig } from './config/env.config';
import { Env } from './models/enums/env.enum';
import { apiRouter } from './router/api.router';
import { router } from './utils/router.util';

require('dotenv').config();
checkEnvironments('key value');

const app = express();
const port = envConfig(Env.APP_PORT);
const host = `${envConfig(Env.APP_HOST)}:${port}`;

app.use(express.json());
app.use(express.urlencoded());

app.use(router('/api'), apiRouter);

// ! Tiene que ser el ante último ruteo
app.use(async (req: express.Request, res: express.Response) => {
    return res.status(200).send({ msg: 'Funciona' });
});

// ! Tiene que ser el último ruteo
app.use(async (req: express.Request, res: express.Response) => {
    return res.status(500).send({ msg: 'Página no encontra' });
});

app.listen(port, () => {
    console.log('-----------------------------------------------------');
    console.log(`Aplicación corriendo en : ${host}`);
    console.log('-----------------------------------------------------');
});
