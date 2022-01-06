import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'
import UserService from '../services/user.service';
import IUserDAO from '../entities/user.dao';
export const register = (us: UserService) => (req: Request, res: Response, next: NextFunction) => {
    let user: IUserDAO = {
        id: uuidv4(),
        name: req.body.data.name,
        age: req.body.data.age,
        country: req.body.data.country,
        email: req.body.data.email,
        password: req.body.data.password
    }
    const id = us.create(user)
    if(id) {
        return res.status(200).json({
            message: `ID of the user: ${id}`
        });
    } else {
        return res.status(500).json({
            message: 'Something went wrong'
        });
    }
};