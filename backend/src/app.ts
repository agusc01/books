
import express from 'express';
import path from 'path';
import { testDataBaseWithSequelice } from './config/db.config';
import { checkEnvironments, envConfig } from './config/env.config';
import { errorGet } from './controllers/error.controller';
import { isLoggedGuard } from './guards/is-logged.guard';
import { Env } from './models/enums/env.enum';
import { apiRouter } from './router/api.router';
import { authRouter } from './router/auth.router';
import { bookRouter } from './router/book.router';
import { initSession, localsSetLogged, sessionGetLogged } from './services/session.service';
import { router } from './utils/router.util';

const methodOverride = require('method-override');

require('dotenv').config();
checkEnvironments('key value');

const app = express();
const port = envConfig(Env.APP_PORT);
const host = `${envConfig(Env.APP_HOST)}:${port}`;

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride('_method'));

// * STATICS FILES
app.use('/node_modules/bootstrap',
    express.static(path.join(__dirname, './../node_modules/bootstrap')));
app.use('/node_modules/bootstrap-icons',
    express.static(path.join(__dirname, './../node_modules/bootstrap-icons')));
app.use('/node_modules/simple-notify',
    express.static(path.join(__dirname, './../node_modules/simple-notify')));
app.use('/node_modules/sweetalert2',
    express.static(path.join(__dirname, './../node_modules/sweetalert2')));
app.use('/node_modules/@sweetalert2',
    express.static(path.join(__dirname, './../node_modules/@sweetalert2')));
app.use(express.static(path.resolve(__dirname, './../public')));

// * EJS
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, "./views"));

// * SESSION
app.use(initSession());
app.use((req, res, next) => {
    localsSetLogged(res, sessionGetLogged(req));
    next();
});

app.use(router('/api'), apiRouter);
app.use(router('/libro'), isLoggedGuard, bookRouter);
app.use(router('/auth'), authRouter);


// * ULTIMO RUTEO
app.use(router('/api'), async (req: express.Request, res: express.Response) => {
    return res.status(500).send({ msg: 'Libros | Página no encontrada' });
});

app.use(errorGet);

app.listen(port, () => {
    console.log('-----------------------------------------------------');
    console.log(`Aplicación corriendo en : ${host}`);
    console.log('-----------------------------------------------------');
});

testDataBaseWithSequelice();