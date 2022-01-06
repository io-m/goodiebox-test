import { NextFunction, Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: 'Hi, server is running'
    });
};
