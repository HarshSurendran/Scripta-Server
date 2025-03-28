import { Request, Response, NextFunction } from "express";
import CategoriesServices from "../services/categories.services";
import { successResponse } from "../../../utils/response.utils";
import { HttpStatus } from "../../../enums/httpStatus";

export default class CategoriesControllers{
    constructor(private CategoriesServices: CategoriesServices) { }
    
    getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.CategoriesServices.getAllCategories();
            return res.status(HttpStatus.OK).json(successResponse("Categories fetched successfully", response));
        } catch (error) {
            next(error);
        }
    }
}