import { Request, Response, NextFunction } from "express";
import AuthServices from "../services/auth.services";
import { successResponse } from "../../../utils/response.utils";
import { HttpStatus } from "../../../enums/httpStatus";

export default class AuthControllers {
    constructor(private AuthServices: AuthServices) { }
    
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { identifier, password } = req.body;
            const response = await this.AuthServices.login(identifier, password);
            return res.status(HttpStatus.OK).cookie("userToken", response.token, {
                httpOnly: true,       
                secure: false,      
                sameSite: 'lax'
            }).json(successResponse("User logged in successfully", response.user));
        } catch (error) {
            next(error);
        }
    }

    signup = async (req: Request, res: Response, next: NextFunction) => {        
       try {
         const response = await this.AuthServices.signup(req.body);
         res.status(HttpStatus.CREATED).cookie("userToken", response.token).json(successResponse("User created successfully", response.user));
       } catch (error) {
           next(error);          
       }
    }

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie("userToken");
            return res.status(HttpStatus.OK).json(successResponse("User logged out successfully"));
        } catch (error) {
            next(error);
        }
    }
}