import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,  // Convert email to lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isVarified:{
        type: Boolean,
        default:false
    },
    varificationToken:String
});

const User = mongoose.model("User", userSchema);

export default User
