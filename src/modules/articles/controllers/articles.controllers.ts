import { Response, Request, NextFunction } from "express";
import ArticlesServices from "../services/articles.services";
import { HttpStatus } from "../../../enums/httpStatus";
import { successResponse } from "../../../utils/response.utils";

export default class ArticlesControllers {
  constructor(private ArticlesServices: ArticlesServices) {}

  createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = req.files as Express.Multer.File[];    
      if (!files || files.length === 0) {
        throw new Error('No images uploaded');
      }
      const imageUrls = files.map((file) => file.path);      
      req.body.imageurls = imageUrls;      
      const response = await this.ArticlesServices.createArticle(req.body);
      return res.status(HttpStatus.CREATED).json(successResponse("Article created successfully", response));
    } catch (error) {
      next(error);
    }
  };

  getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await this.ArticlesServices.getArticles(req.body.interestedCategories);
      return res.status(HttpStatus.OK).json(successResponse("Articles fetched successfully", response));
    } catch (error) {
      next(error);
    }
  };
}
