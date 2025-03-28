
import CategoriesModels from "../models/categories.models";

export default class CategoriesRepository{

    getCategories = async () => {
        try {
            return await CategoriesModels.find();
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error creating user: ${error.message}`);
                throw new Error('Failed to get categories');
            } else {
                console.error('Unknown error creating user');
                throw error;
            }
        }
    }
    
}