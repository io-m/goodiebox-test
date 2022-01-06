import { NextFunction, Request, Response } from 'express';
import IUserDAO from '../entities/user.dao';
import UserService from '../services/user.service';
export const getProfile = (us: UserService) => (req: Request, res: Response, next: NextFunction) => {
    const users = us.getAll()
    if(users[0]) {
        return res.status(200).json(users);
    } else {
        return res.status(200).json(users);
    }
};
export const updateProfile = (us: UserService) => (req: Request, res: Response, next: NextFunction) => {
    let user: IUserDAO = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        email: req.body.email,
        password: req.body.password
    }
    try {
        const users = us.update(user)
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};