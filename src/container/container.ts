import ArticlesRepository from "../modules/articles/repositories/articles.repository";
import ArticlesService from "../modules/articles/services/articles.services";
import ArticlesControllers from "../modules/articles/controllers/articles.controllers";
import UsersRepository  from "../modules/users/repositories/users.repository";
import UsersServices  from "../modules/users/services/users.services";
import UsersControllers from "../modules/users/controllers/users.controllers";
import AuthServices from "../modules/auth/services/auth.services";
import AuthControllers from "../modules/auth/controllers/auth.controllers";
import TokenServices  from "../modules/auth/services/token.services";
import CategoriesRepository from "../modules/categories/repositories/categories.repository";
import CategoriesServices from "../modules/categories/services/categories.services";
import CategoriesControllers from "../modules/categories/controllers/categories.controllers";
import BlockListRepository from "../modules/articles/repositories/blockList.repository";

export const container = {
  //BlockList Dependencies
  BlockListRepository: new BlockListRepository(),

  //Articles Dependencies
  ArticlesRepository: new ArticlesRepository(),
  ArticlesService: null as ArticlesService | null,
  ArticlesControllers: null as ArticlesControllers | null,

  //Token Dependencies
  TokenServices: new TokenServices(),

  //User Dependencies
  UsersRepository: new UsersRepository(),
  UsersControllers: null as UsersControllers | null,
  UsersServices: null as UsersServices | null,

  //Auth Dependencies
  AuthControllers: null as AuthControllers | null,
  AuthServices: null as AuthServices | null,

  //Categories Dependencies
  CategoriesRepository: new CategoriesRepository(),
  CategoriesServices: null as CategoriesServices | null,
  CategoriesControllers : null as CategoriesControllers | null,

};

container.ArticlesService = new ArticlesService(container.ArticlesRepository, container.BlockListRepository);
container.ArticlesControllers = new ArticlesControllers(container.ArticlesService);

container.UsersServices = new UsersServices(container.UsersRepository);
container.UsersControllers = new UsersControllers(container.UsersServices);

container.AuthServices = new AuthServices(container.UsersRepository, container.TokenServices);
container.AuthControllers = new AuthControllers(container.AuthServices);

container.CategoriesServices = new CategoriesServices(container.CategoriesRepository);
container.CategoriesControllers = new CategoriesControllers(container.CategoriesServices);