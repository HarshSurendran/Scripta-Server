import { CreateUser } from "../../users/dtos/createUser.dtos";
import UsersRepository from "../../users/repositories/users.repository";
import TokenServices  from "./token.services";
import { AppError } from "../../../middlewares/error.middleware"
import { HttpStatus } from "../../../enums/httpStatus";
import bcrypt from 'bcrypt';

export default class AuthServices {
    constructor(private UsersRepository: UsersRepository, private TokenServices: TokenServices) { }
    
    login = async (identifier: string, password: string) => {
        try {
            let user;
            if (identifier.includes('@')) {
                user = await this.UsersRepository.getUserByEmail(identifier);
                if (!user) throw new AppError('User not found', HttpStatus.UNAUTHORIZED);
               
            } else {
                user = await this.UsersRepository.getUserByPhone(Number(identifier));
                if (!user) throw new AppError('User not found', HttpStatus.UNAUTHORIZED);
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) throw new AppError('Invalid credentials', HttpStatus.UNAUTHORIZED);

            const payload = { id: user._id, email: user.email };
            const token = await this.TokenServices.generateToken(payload);
            user = user.toObject();
            delete user.password;

            return { user, token };            
        } catch (error) {
            throw error;
        }
    }

    signup = async (formData: CreateUser) => {
        try {
            const userExists = await this.UsersRepository.getUserByEmail(formData.email);
            if (userExists) throw new AppError('Email already exists', HttpStatus.CONFLICT);

            const userPhoneExists = await this.UsersRepository.getUserByPhone(formData.phone);
            if (userPhoneExists) throw new AppError('Phone number already exists', HttpStatus.CONFLICT);

            const hashedPass = await bcrypt.hash(formData.password, 10);
            formData.password = hashedPass;

            const userDocument = await this.UsersRepository.createUser(formData);
            const user = userDocument.toObject();
            delete user.password;

            const payload = { id: user._id, email: user.email };
            const token = await this.TokenServices.generateToken(payload);
            return { user, token };
        } catch (error) {  
            throw error;
        }
    }
    
}