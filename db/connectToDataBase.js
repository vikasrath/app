import mongoose from "mongoose"

const connectToDataBase = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/careerApp")
        console.log("connected to db");
    } catch (error) {
        console.log(error.message);
        
    }
  
}

export default connectToDataBase