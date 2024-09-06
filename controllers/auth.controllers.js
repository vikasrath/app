import { validationResult } from "express-validator";
import User from "../models/user.js";
import bcrypt from "bcryptjs"
import { generateAndSendToken } from "../utils/generateAndSendToken.js";

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

        const token = await generateAndSendToken(email)
    
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            varificationToken:token
        })

        await newUser.save()
    
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            isvarified: newUser.isVarified,
            varificationToken: newUser.varificationToken
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

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.log("Error in login controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const token_varification = async (req, res) => {
    try {
        const {email, token} = req.body;
    
        const user = await User.findOne({email})
    
        if(!user.varificationToken == token){
            return res.status(401).json({message: "Token dosent matches"})
        }
    
        user.isVarified = true;
        user.varificationToken = undefined;

        await user.save()
    
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        console.log("Error in token varification controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
    
}