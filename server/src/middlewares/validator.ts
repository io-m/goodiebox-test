import { Request, Response, NextFunction } from "express"
import logging from "../utils/logging"
const NAMESPACE = 'Validate middleware'

const validateInputs = (req: Request, res: Response, next: NextFunction) => {
    try {
        const email = req.body.email.trim().toLowerCase()
        const password = req.body.password
        const confirmPassword = req.body.confirm
        console.log(password)
        console.log(confirmPassword)
        if(password !== confirmPassword || !email) {
            logging.error(NAMESPACE, 'Password is not the same as confirm password')
            throw new Error("Something went wrong")
        }
        next()
    } catch (error: any) {
        res.status(400).send(error.message)
    }
}
export default validateInputs