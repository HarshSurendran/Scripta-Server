import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import {errorHandler} from './middlewares/error.middleware';
import logger from './utils/logger.utils';
import ArticlesRouter from './modules/articles/routes/articles.routes';
import AuthRouter from './modules/auth/routes/auth.routes';

const app = express();

app.use(express.json());    
app.use(express.urlencoded({ extended: true }));

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

app.use("/", (req, res) => {    
    res.send("Hello World");
});

app.use(errorHandler);

export default app;