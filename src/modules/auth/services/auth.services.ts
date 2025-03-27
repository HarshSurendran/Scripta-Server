import { CreateUser } from "../../users/dtos/createUser.dtos";
import { UsersRepository } from "../../users/repositories/users.repository";
import { TokenServices } from "./token.services";
import { AppError } from "../../../middlewares/error.middleware"
import { HttpStatus } from "../../../enums/httpStatus";

export default class AuthServices {
    constructor(private UsersRepository: UsersRepository, private TokenServices: TokenServices) { }
    
    login = async (identifier: string, password: string) => {


    }

    signup = async (formData: CreateUser) => {
        try {
            const userExists = await this.UsersRepository.getUserByEmail(formData.email);
            if (userExists) throw new AppError('Email already exists', HttpStatus.CONFLICT);
            const userPhoneExists = await this.UsersRepository.getUserByPhone(formData.phone);
            if (userPhoneExists) throw new AppError('Phone number already exists', HttpStatus.CONFLICT);
            const user = await this.UsersRepository.createUser(formData);
            const payload = { id: user._id, email: user.email };
            const token = await this.TokenServices.generateToken(payload);
            return { user, token };
        } catch (error) {  
            throw error;
        }
    }
    
}