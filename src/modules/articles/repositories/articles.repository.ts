import { ICreateArticles } from "../dtos/createArticels.dto";
import articlesModels from "../models/articles.models";


export default class ArticlesRepository {
    create = async (data: ICreateArticles) => {
        try {
            const article = new articlesModels(data);
            return await article.save();            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating article: ${error.message}`);
                throw new Error('Failed to create article');
            } else {
                console.error('Unknown error creating article');
                throw error;
            }            
        }
    }
    
    delete = async (id: string) => {
        try {
            return await articlesModels.findByIdAndDelete(id);            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error deleting article: ${error.message}`);
                throw new Error('Failed to delete article');
            } else {
                console.error('Unknown error deleting article');
                throw error;
            }            
        }
    }

    getArticles = async (data: string[] ) => {
        try {
            return await articlesModels.find({category: {$in: data}}).populate('author', "firstName lastName shortName email phone image");            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error getting articles: ${error.message}`);
                throw new Error('Failed to get articles');
            } else {
                console.error('Unknown error getting articles');
                throw error;
            }            
        }
    }
}