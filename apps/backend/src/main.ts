import { logger, requestLogger } from '@nx-sandbox/utils';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { UsersRouter } from './routers/UsersRouter';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(requestLogger);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/users', UsersRouter);

app.listen(port, host, () => {
  logger.info(`Servidor iniciado em http://${host}:${port}`);
});
