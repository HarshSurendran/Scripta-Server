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

    getArticles = async (data: string[], userId: string) => {
        try {
            return await this.ArticlesRepository.getArticles(data, userId);
        } catch (error) {
            throw error;
        }
    };

    getUserArticles = async (userId: string) => {
        try {
            return await this.ArticlesRepository.getUserArticles(userId);
        } catch (error) {
            throw error;
        }
    };

    updateArticle = async (articleId: string, userId: string, data: Partial<ICreateArticles>) => {
        try {
            const article = await this.ArticlesRepository.getById(articleId);
            if (article.author.toString() !== userId) {
                throw new Error('You are not authorized to update this article');
            }
            return await this.ArticlesRepository.update(articleId, data);
        } catch (error) {
            throw error;
        }
    };

    deleteArticle = async (articleId: string, userId: string) => {
        try {
            const article = await this.ArticlesRepository.getById(articleId);
            if (article.author.toString() !== userId) {
                throw new Error('You are not authorized to delete this article');
            }
            return await this.ArticlesRepository.delete(articleId);
        } catch (error) {
            throw error;
        }
    };

    likeAndDislikeArticle = async (articleId: string, userId:string, data: {}) => {
        try {
            return await this.ArticlesRepository.likeAndDislikeArticle(articleId,userId, data);
        } catch (error) {
            throw error;
        }
    };
    
    
}