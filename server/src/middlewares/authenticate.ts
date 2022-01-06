import { Request, Response, NextFunction } from "express"
import admin from "../utils/firebase-config";

export const isAuth = async (req: Request, res: Response, nextMiddleware: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if(req.headers.authorization?.split(' ')[1]) {
            const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization?.split(' ')[1])
            if(decodedToken) {
                return nextMiddleware()
            }
        }
        return res.status(401).json({
            message: "Unauthorized"
        })
    } catch (error: any) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    
}