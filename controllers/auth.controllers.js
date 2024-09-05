import { validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";

export const register = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }
    try {
        const {name,email,password} = req.body;
    
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({error: "email already exists"});
        }
    
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })

        const token = generateToken(newUser._id)
    
        await newUser.save()
    
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token
        })
    } catch (error) {
        console.log("Error in register controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
    
        if(!user){
            return res.status(401).json({error: "Incorrect Username or Password"})
        }
    
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(401).json({ error: "Incorrect Username or Password"})
        }

        const token = generateToken(user._id)
    
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        })
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}