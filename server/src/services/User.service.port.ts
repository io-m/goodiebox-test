import IUserDAO from "../entities/user.dao";
import IUserDTO from "../entities/user.dto";
export const transformData = (data: IUserDAO|undefined): IUserDTO|undefined => {
    let dataToReturn: IUserDTO = {
        id: data?.id,
        name: data?.name,
        age: data?.age,
        email: data?.email,
        country: data?.country,
        picture: data?.picture,
        createdAt: data?.createdAt,
        updatedAt: data?.updatedAt
    }
    return dataToReturn
}
export default abstract class UserServicePort {
    abstract create(user: IUserDAO):Promise<string|undefined>
    abstract getAll(): (IUserDTO|undefined)[]
    abstract getOne(id: string): IUserDTO | undefined
    abstract update(user: IUserDAO): unknown
}