import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {errorHandler} from './middlewares/error.middleware';
import logger from './utils/logger.utils';
import ArticlesRouter from './modules/articles/routes/articles.routes';
import AuthRouter from './modules/auth/routes/auth.routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
}));
app.use(express.json());    
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    logger.info({
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
    });
    next();
});

app.use("/api/v1/articles", ArticlesRouter);
app.use("/api/v1/auth", AuthRouter);

app.use(errorHandler);

export default app;