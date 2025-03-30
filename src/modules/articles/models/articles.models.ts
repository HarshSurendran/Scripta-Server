import mongoose, { Schema, Types } from "mongoose";

export interface IArticles extends Document {
    title: string;
    description: string;
    imageurls: string[];
    tags: string[];
    category: string;
    author: Types.ObjectId;
    likes?: number;
    dislikes?: number;
}

const ArticlesSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageurls: { type: [String], required: true },
        tags: { type: [String], required: true },
        category: { type: String, required: true },
        author: { type: Types.ObjectId, ref: 'User', required: true },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        likedBy: { type: [Types.ObjectId], ref: 'User', default: [] },
        dislikedBy: { type: [Types.ObjectId], ref: 'User', default: [] },
    },
    { timestamps: true }
);

export default mongoose.model<IArticles>('Articles', ArticlesSchema);