import { UsersRepository } from "../repositories/users.repository";

export class UsersServices {
    constructor(private UsersRepository: UsersRepository) { }
}