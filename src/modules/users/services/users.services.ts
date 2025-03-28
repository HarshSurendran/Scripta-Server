import { CreateUser } from "../dtos/createUser.dtos";
import UsersRepository  from "../repositories/users.repository";

export default class UsersServices {
    constructor(private UsersRepository: UsersRepository) { }

    updateUser = async (userId: string, data: Partial<CreateUser>) => {
        try {
            return this.UsersRepository.updateUser(userId, data);
        } catch (error) {
            throw error
        }
    }
}