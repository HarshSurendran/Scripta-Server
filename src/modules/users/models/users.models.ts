import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    shortName: string;
    email: string;
    phone: number;
    dob: Date;
    password: string;
    interestedCategories?: string[];
    image?: string;
}

const UserSchema: Schema = new Schema({
    firstName: {type: String, required: true},
    lastName: { type: String, required: true },
    shortName: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    phone: {type: Number, required: true, unique: true},
    dob: {type: Date , required: true},
    password: { type: String, required: true},
    interestedCategories:{type: [String], default: []},    
    image: { type: String, default: "" }, 
});

export default mongoose.model<IUser>('User', UserSchema);