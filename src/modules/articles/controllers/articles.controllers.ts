import { Response, Request, NextFunction } from "express";
import ArticlesServices from "../services/articles.services";
import { HttpStatus } from "../../../enums/httpStatus";
import { successResponse } from "../../../utils/response.utils";
import { AuthRequest } from "../../../middlewares/auth.middleware";

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

  updateArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params.id;
      const userId = req.user.id;
      const files = req.files as Express.Multer.File[];
      
      if(files.length > 0) {
        const imageUrls = files.map((file) => file.path);
        console.log(imageUrls, "New imageUrls");
        req.body.imageurls = req.body.imageurls ? `${req.body.imageurls},${imageUrls}` : imageUrls;
      }

      if (req.body.imageurls && typeof req.body.imageurls === 'string' ) {
        req.body.imageurls = req.body.imageurls.split(',').map((url: string) => url.trim());
      }

      const response = await this.ArticlesServices.updateArticle(articleId, userId, req.body);
      return res.status(HttpStatus.OK).json(successResponse("Article updated successfully", response));
    } catch (error) {
      next(error);
    }
  }

  getArticles = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id; 
      const response = await this.ArticlesServices.getArticles(req.body.interestedCategories, userId );
      return res.status(HttpStatus.OK).json(successResponse("Articles fetched successfully", response));
    } catch (error) {
      next(error);
    }
  };

  getUserArticles = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const response = await this.ArticlesServices.getUserArticles(userId);
      return res.status(HttpStatus.OK).json(successResponse("Articles fetched successfully", response));
    } catch (error) {
      next(error);
    }
  };

  deleteArticle = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params.id;
      const userId = req.user.id;
      const response = await this.ArticlesServices.deleteArticle(articleId, userId);
      return res.status(HttpStatus.OK).json(successResponse("Article deleted successfully", response));
    } catch (error) {
      next(error);
    }
  }

  alterUserAction = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const articleId = req.params.id;
      const userId = req.user.id;
      const response = await this.ArticlesServices.likeAndDislikeArticle(articleId, userId, req.body);
      return res.status(HttpStatus.OK).json(successResponse("Article updated successfully", response));
    } catch (error) {
      next(error);
    }
  }
}
