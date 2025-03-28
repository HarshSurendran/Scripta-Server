import { CreateUser } from "../dtos/createUser.dtos";
import usersModels from "../models/users.models";


export default class UsersRepository {
    createUser = async (data: CreateUser) => {
        try {
            const user = new usersModels(data);
            return await user.save();            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating user: ${error.message}`);
                throw new Error('Failed to create user');
            } else {
                console.error('Unknown error creating user');
                throw error;
            }
        }
    }

    updateUser = async (id: string, data: Partial<CreateUser>) => {
        try {
            return await usersModels.findOneAndUpdate({ _id: id }, data, { new: true });           
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating user: ${error.message}`);
                throw new Error('Failed to update user');
            } else {
                console.error('Unknown error creating user');
                throw new Error('Unknown error');
            }
        }
    }

    getUserById = async (id: string) => {
        try {
            const user = await usersModels.findById(id);
            return user;            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating user: ${error.message}`);
                throw new Error('Failed to get user');
            } else {
                console.error('Unknown error creating user');
                throw new Error('Unknown error');
            }
        }
    }

    getUserByEmail = async (email: string) => {
        try {
            const user = await usersModels.findOne({ email });
            return user;            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating user: ${error.message}`);
                throw new Error('Failed to get user');
            } else {
                console.error('Unknown error creating user');
                throw new Error('Unknown error');
            }
        }
    }

    getUserByPhone = async (phone: number) => {
        try {
            const user = await usersModels.findOne({ phone });
            return user;            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating user: ${error.message}`);
                throw new Error('Failed to get user');
            } else {
                console.error('Unknown error creating user');
                throw new Error('Unknown error');
            }
        }
    }


}