import { Request, Response, NextFunction } from "express";
import { CreateUser } from "../dtos/createUser.dtos";
import  UsersServices  from "../services/users.services";
import { AuthRequest } from "../../../middlewares/auth.middleware";
import { HttpStatus } from "../../../enums/httpStatus";
import { successResponse } from "../../../utils/response.utils";

export default class UsersControllers {
    constructor(private UsersServices: UsersServices) { }

    updateUser =  async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data: Partial<CreateUser> = req.body;
            const user = req.user;
            console.log(data, user, "From controller");
            const response = this.UsersServices.updateUser(user.id, data);
            res.status(HttpStatus.NO_CONTENT).json(successResponse("Updated successfully.", response));            
        } catch (error) {
            next(error);            
        }
    }
}