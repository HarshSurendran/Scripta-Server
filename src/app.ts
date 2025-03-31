import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {errorHandler} from './middlewares/error.middleware';
import logger from './utils/logger.utils';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import ArticlesRouter from './modules/articles/routes/articles.routes';
import AuthRouter from './modules/auth/routes/auth.routes';
import UsersRouter from './modules/users/routes/users.routes';
import CategoriesRouter from './modules/categories/routes/categories.routes';

const app = express();
const frontendUrl = process.env.FRONTEND_URL;
app.use(cors({
    origin: frontendUrl,
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
app.use('/api/v1/users', UsersRouter);
app.use('/api/v1/categories', CategoriesRouter);

app.use(errorHandler);

export default app;