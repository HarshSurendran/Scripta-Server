import { createBlockList } from "../dtos/createBlockList.dto";
import blockListModels, { IBlockList } from "../models/blockList.models";

export default class BlockListRepository {
    create = async (data: createBlockList) => {
        try {  
            const blockList = new blockListModels(data);
            return await blockList.save(); 
        } catch (error) {
            throw error;
        }
    }

    getNoOfBlocks = async (articleId: string) => {
        try {
            return await blockListModels.countDocuments({articleId});
        } catch (error) {
            throw error;
        }
    }
}