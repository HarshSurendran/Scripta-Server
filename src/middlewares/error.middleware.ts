import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger.utils';

class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    error.message = error.message;

    logger.error({
        message: error.message,
        stack: error.stack,
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
    });

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            success: false,
            error: error.message
        });
    }

    // For unhandled errors
    return res.status(500).json({
        success: false,
        error: 'Server Error'
    });
};

export { AppError, errorHandler };

