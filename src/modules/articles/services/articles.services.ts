import { ICreateArticles } from "../dtos/createArticels.dto";
import ArticlesRepository from "../repositories/articles.repository";
import BlockListRepository from "../repositories/blockList.repository";



export default class ArticlesServices {
    constructor(private ArticlesRepository: ArticlesRepository, private BlockListRepository: BlockListRepository) { }

    createArticle = async (data: ICreateArticles) => {
        try {
            return await this.ArticlesRepository.create(data);
        } catch (error) {
            throw error;
        }
    }

    getArticles = async (data: string[], userId: string, page: number, limit: number) => {
        try {
            const skip = (page - 1) * limit;
            const result = await this.ArticlesRepository.getArticles(data, userId, skip, limit);
            return {
                ...result,
                pageLeft: result.totalCount - page * limit
            }
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

    blockArticle = async (data: { userId: string, articleId: string, reason: string }) => {
        try {
            return await this.BlockListRepository.create(data);
        } catch (error) {
            throw error;
        }
    }
    
    getNoOfBlocks = async (articleId: string) => {
        try {
            return await this.BlockListRepository.getNoOfBlocks(articleId);            
        } catch (error) {
            throw error;
        }
    }
}