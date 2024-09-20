import mongoose from 'mongoose';

const connectDB = async()=>{
    try {

        const conn = await mongoose.connect(process.env.mongodb_URI,{dbName:process.env.mongodb_NAME});
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error.message);
    }
}
export default connectDB;