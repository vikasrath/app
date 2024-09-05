import mongoose from "mongoose"

const connectToDataBase = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("connected to db");
    } catch (error) {
        console.log(error.message);
        
    }
  
}

export default connectToDataBase