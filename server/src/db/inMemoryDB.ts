import IUser from "../entities/user.dao"
import User from "../entities/User"
import IUserDAO from "../entities/user.dao"

const userRepo: IUserDAO[] = []
//  This is in memory DB, so when server is refreshed data is lost (so keep that in mind when testing)
export class InMemoRepo extends User {
    create(user: IUserDAO): string|undefined {
        userRepo.push(user)
        console.log(" from create -> DB: ", userRepo)
        return userRepo[userRepo.length - 1].id
    }
    getAll(): IUserDAO[] {
        return userRepo
    }
    getOne(id: string): (IUser | undefined) {
        return userRepo.find(user => user.id === id)
    }
    update(user: IUserDAO): IUser | unknown {
        try {
            let idx: number | undefined = 0
            for(const [i, u] of userRepo.entries()) {
                if(u.id === user.id) {
                    idx = i
                }
            }
            userRepo.splice(idx, 1, user)[0]
            return userRepo[idx]
        } catch (error) {
            return error
        }
        
    }
}