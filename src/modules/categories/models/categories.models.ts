import mongoose, { Schema } from "mongoose";

export interface ICategories extends Document {
    _id: string;
    name: string;
}

const CategoriesSchema: Schema = new Schema({
    name: { type: String, required: true }
});

export default mongoose.model<ICategories>('Categories', CategoriesSchema);