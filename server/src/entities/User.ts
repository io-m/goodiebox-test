import IUserDAO from "./user.dao";
export default abstract class User {
    abstract create(user: IUserDAO): string|undefined
    abstract getAll(): IUserDAO[] 
    abstract getOne(id: string): IUserDAO | undefined
    abstract update(user: IUserDAO): IUserDAO | unknown
}