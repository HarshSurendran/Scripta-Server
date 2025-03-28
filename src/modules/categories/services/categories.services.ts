import CategoriesRepository from "../repositories/categories.repository";

export default class CategoriesServices {
    constructor(private CategoriesRepository: CategoriesRepository) { }

    getAllCategories = async () => {
        try {
            return await this.CategoriesRepository.getCategories();
        } catch (error) {
            throw error;
        }
    }
}