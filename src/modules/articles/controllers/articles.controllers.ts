import { Response, Request } from "express";
import ArticlesServices from "../services/articles.services";

export default class ArticlesControllers {
  constructor(private ArticlesServices: ArticlesServices) {}

  createArticle = async (req: Request, res: Response) => {
    res.send("created article");
  };
}
