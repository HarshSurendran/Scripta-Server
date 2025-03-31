import mongoose, { Schema, Types } from "mongoose";

export interface IBlockList extends Document {
    userId: string;
    articleId: string;
    reason: string;
}

const BlockListSchema: Schema = new Schema(
    {
        userId: { type: Types.ObjectId, ref: 'User', required: true },
        articleId: { type: Types.ObjectId, ref: 'Articles', required: true },
        reason: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IBlockList>('BlockList', BlockListSchema);