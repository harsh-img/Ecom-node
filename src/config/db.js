import mongoose from "mongoose";

const connectDb = async ()=>{

    try{

        const conn = await mongoose.connect(process.env.DB_URL);
        conn ? console.log('Database connected') : console.log('Database not connected');

    }catch(err){
        return console.log(err);
    }
}

export default connectDb