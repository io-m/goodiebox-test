import bcrypt from 'bcrypt'
import logging from './logging'
const NAMESPACE = 'Password hashing'

export const encrypt = async (password: string, salt?: number):Promise<string> => {
    try {
        !salt ? salt = 10 : salt
        const encryptedPassword = await bcrypt.hash(password, salt)
        if(!encryptedPassword) {
            logging.error(NAMESPACE, "Could not encrypt password")
        }
        return encryptedPassword
    } catch (error: any) {
        return error.message
    }
}
export const decrypt = async (password: string, encryptedPassword: string):Promise<boolean> => {
    try {
        const pass = await bcrypt.compare(password, encryptedPassword)
        return pass
    } catch (error) {
        logging.error(NAMESPACE, "Could not decrypt password")
        return false
    }
}