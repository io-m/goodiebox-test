import IUserDTO from "../entities/user.dto";
import IUserDAO from "../entities/user.dao";
import { InMemoRepo } from '../db/inMemoryDB';
import dayjs from 'dayjs'
import UserServicePort, { transformData } from "./User.service.port";
import { encrypt } from "../utils/hashing";
const inMemo: InMemoRepo = new InMemoRepo()
export default class UserService extends UserServicePort {
    async create(user: IUserDAO):Promise<string|undefined> {
        // Here we can call some third party API if needed (f.e. unsplash api for picture to append to User profile)
        user.createdAt = dayjs().format('DD.MM.YYYYTHH:mm:ssZ[Z]') // Appending creation time
        if(user.password) {
            const hashedPassword = await encrypt(user.password)
            user.password = hashedPassword
        }
        return inMemo.create(user)
    }
    getAll(): (IUserDTO|undefined)[] {
        const daoUserS = inMemo.getAll()
        return daoUserS.map(user => transformData(user))
    }
    getOne(id: string): IUserDTO | undefined {
        const daoUser = inMemo.getOne(id)
        return transformData(daoUser)
    }
    update(user: IUserDAO): unknown {
        user.updatedAt = dayjs().format('DD.MM.YYYYTHH:mm:ssZ[Z]')
        return inMemo.update(user)
    }
}