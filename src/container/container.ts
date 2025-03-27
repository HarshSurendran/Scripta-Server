import ArticlesControllers from "../modules/articles/controllers/articles.controllers";
import ArticlesService from "../modules/articles/services/articles.service";
import ArticlesRepository from "../modules/articles/repositories/articles.repository";

export const container = {
    //Articles Dependencies
    ArticlesRepository: new ArticlesRepository(),
    ArticlesControllers: null as ArticlesControllers | null,
    ArticlesService: null as ArticlesService | null,
}

container.ArticlesService = new ArticlesService(container.ArticlesRepository);
container.ArticlesControllers = new ArticlesControllers(container.ArticlesService);