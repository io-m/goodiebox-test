import { Request, Response, NextFunction } from "express"
import logging from '../utils/logging'
/** Log the request */

function logger(NAMESPACE: string) {
    return (req: Request, res: Response, nextMiddleware: NextFunction) => {
        /** Log the req */
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    
        res.on('finish', () => {
            /** Log the res */
            logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
        })
        
        nextMiddleware();
    }
} 
export default logger