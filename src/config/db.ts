import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to DB");        
    } catch (error) {
        console.log(error, "ERR: while connecting to DB");
        process.exit(1);
    }
}

export default connectDB;