import { Response, Request } from "express";
import ArticlesService from "../services/articles.service";


export default class ArticlesControllers {

    constructor(private ArticlesService: ArticlesService) { }

    createArticle = async (req: Request, res: Response) => {
        
        res.send("created article");
    }
}