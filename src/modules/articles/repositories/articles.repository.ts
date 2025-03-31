import mongoose from "mongoose";
import { ICreateArticles } from "../dtos/createArticels.dto";
import articlesModels from "../models/articles.models";
interface UpdateQuery {
    $addToSet?: { likedBy: string } | { dislikedBy: string };
    $pull?: { likedBy: string } | { dislikedBy: string };
    $inc?: { likes: number } | { dislikes: number } | { likes: number, dislikes: number };   
}

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

    update = async (id: string, data: Partial<ICreateArticles>) => {
        try {
            return await articlesModels.findByIdAndUpdate(id, data, { new: true });            
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error updating article: ${error.message}`);
                throw new Error('Failed to update article');
            } else {
                console.error('Unknown error updating article');
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

    getById = async (id: string) => {
        try {
            return await articlesModels.findById(id);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error getting article: ${error.message}`);
                throw new Error('Failed to get article');
            } else {
                console.error('Unknown error getting article');
                throw error;
            }
        }
    };

    getArticles = async (data: string[], userId: string, skip: number, limit: number) => {
        try {
            const userObjectId = new mongoose.Types.ObjectId(userId)
            // const articles = await articlesModels.aggregate([
            //     {
            //       $lookup: {
            //         from: "blocklists", 
            //         localField: "_id",
            //         foreignField: "articleId",
            //         let: { userId: userObjectId },
            //         pipeline: [
            //           { $match: { $expr: { $eq: ["$userId", "$$userId"] } } }
            //         ],
            //         as: "blockedInfo"
            //       }
            //     },
            //     {
            //       $match: {
            //         blockedInfo: { $size: 0 } 
            //       }
            //     },
            //     {
            //         $match: {
            //           category: { $in: data }, 
            //           author: { $ne: userObjectId } 
            //         }
            //       },
            //     {
            //         $lookup: {
            //             from: "users",
            //             localField: "author",
            //             foreignField: "_id",
            //             as: "author"
            //         }
            //     },
            //     {
            //         $unwind: "$author"
            //     },
            //     {
            //         $skip: skip
            //     },
            //     {
            //         $limit: limit
            //     },
            //     {
            //       $project: {
                        
            //             title: 1,
            //             description: 1,
            //             imageurls: 1,
            //             tags: 1,
            //             category: 1,
            //             likes: 1,
            //             dislikes: 1,
            //             author: {
            //                 _id: 1,
            //                 firstName: 1,
            //                 lastName: 1,
            //                 shortName: 1,
            //                 email: 1,
            //                 phone: 1,
            //             },
            //             likedBy: 1,
            //             dislikedBy: 1,
            //             createAt: 1
            //       }
            //     }
            // ]);
            
            // return articles;
            const articles = await articlesModels.aggregate([
                {
                    $lookup: {
                        from: "blocklists",
                        localField: "_id",
                        foreignField: "articleId",
                        let: { userId: userObjectId },
                        pipeline: [{ $match: { $expr: { $eq: ["$userId", "$$userId"] } } }],
                        as: "blockedInfo"
                    }
                },
                {
                    $match: {
                        blockedInfo: { $size: 0 }
                    }
                },
                {
                    $match: {
                        category: { $in: data },
                        author: { $ne: userObjectId }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "author",
                        foreignField: "_id",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $facet: {
                        metadata: [{ $count: "total" }], // Count total articles after filtering
                        articles: [
                            { $skip: skip },
                            { $limit: limit },
                            {
                                $project: {
                                    title: 1,
                                    description: 1,
                                    imageurls: 1,
                                    tags: 1,
                                    category: 1,
                                    likes: 1,
                                    dislikes: 1,
                                    author: {
                                        _id: 1,
                                        firstName: 1,
                                        lastName: 1,
                                        shortName: 1,
                                        email: 1,
                                        phone: 1,
                                    },
                                    likedBy: 1,
                                    dislikedBy: 1,
                                    createAt: 1
                                }
                            }
                        ]
                    }
                }
            ]);
            
            const total = articles[0].metadata[0]?.total || 0;
            const result = {
                totalCount: total,
                articles: articles[0].articles
            };
            console.log(result, "This is the result");
            return result;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error getting articles: ${error.message}`);
                throw new Error('Failed to get articles');
            } else {
                console.error('Unknown error getting articles');
                throw error;
            }
        }
    };

    getUserArticles = async (userId: string) => {
        try {
            return await articlesModels.find({ author: userId }).populate('author', "firstName lastName shortName email phone image");
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error getting user articles: ${error.message}`);
                throw new Error('Failed to get user articles');
            } else {
                console.error('Unknown error getting user articles');
                throw error;
            }
        }
    };

    likeAndDislikeArticle = async (articleId: string, userId: string, data: { likes?: number; dislikes?: number }) => {
        try {
            let updatedQuery : UpdateQuery = {} 
                 
            const likeChange = data.likes === 1 ? 1 : data.likes === -1 ? -1 : 0;
            const dislikeChange = data.dislikes === 1 ? 1 : data.dislikes === -1 ? -1 : 0;

            console.log("likeChange", likeChange, dislikeChange, updatedQuery);
            
            if (likeChange == 1) {
                updatedQuery.$addToSet = { likedBy: userId };
            } else if (likeChange == -1) {
                updatedQuery.$pull = { likedBy: userId };
            }

            if (dislikeChange == 1) {
                updatedQuery.$addToSet = { dislikedBy: userId };
            } else if (dislikeChange == -1) {
                updatedQuery.$pull = { dislikedBy: userId };
            }

            updatedQuery.$inc = { likes: likeChange, dislikes: dislikeChange };

            console.log("This is the query", updatedQuery);

            // Update the document directly in the database
            const updatedArticle = await articlesModels.findByIdAndUpdate(
                articleId,
                updatedQuery,
                { new: true }
            );

            if (!updatedArticle) {
                throw new Error('Article not found');
            }

            return updatedArticle;
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Error liking or disliking article: ${error.message}`);
                throw new Error('Failed to like or dislike article');
            } else {
                console.error('Unknown error liking or disliking article');
                throw error;
            }
        }
    };
}