import { ICreateArticles } from "../dtos/createArticels.dto";
import ArticlesRepository from "../repositories/articles.repository";



export default class ArticlesServices {
    constructor(private ArticlesRepository: ArticlesRepository) { }

    createArticle = async (data: ICreateArticles) => {
        try {
            return await this.ArticlesRepository.create(data);
        } catch (error) {
            throw error;
        }
    }

    deleteArticle = async (id: string) => {
        try {
            return await this.ArticlesRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }

    getArticles = async (data: string[]) => {
        try {
            return await this.ArticlesRepository.getArticles(data);
        } catch (error) {
            throw error;
        }
    }
    
    
}