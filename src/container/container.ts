import ArticlesControllers from "../modules/articles/controllers/articles.controllers";
import ArticlesService from "../modules/articles/services/articles.services";
import ArticlesRepository from "../modules/articles/repositories/articles.repository";
import { UsersRepository } from "../modules/users/repositories/users.repository";
import { UsersControllers } from "../modules/users/controllers/users.cotrollers";
import { UsersServices } from "../modules/users/services/users.services";
import AuthServices from "../modules/auth/services/auth.services";
import AuthControllers from "../modules/auth/controllers/auth.controllers";
import { TokenServices } from "../modules/auth/services/token.services";

export const container = {
  //Articles Dependencies
  ArticlesRepository: new ArticlesRepository(),
  ArticlesControllers: null as ArticlesControllers | null,
  ArticlesService: null as ArticlesService | null,

  //Token Dependencies
  TokenServices: new TokenServices(),

  //User Dependencies
  UsersRepository: new UsersRepository(),
  UsersControllers: null as UsersControllers | null,
  UsersServices: null as UsersServices | null,

  //Auth Dependencies
  AuthControllers: null as AuthControllers | null,
  AuthServices: null as AuthServices | null,

};

container.ArticlesService = new ArticlesService(container.ArticlesRepository);
container.ArticlesControllers = new ArticlesControllers(container.ArticlesService);

container.UsersServices = new UsersServices(container.UsersRepository);
container.UsersControllers = new UsersControllers(container.UsersServices);

container.AuthServices = new AuthServices(container.UsersRepository, container.TokenServices);
container.AuthControllers = new AuthControllers(container.AuthServices);
