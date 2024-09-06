import express from "express"
import { body } from "express-validator";
import { login, register, token_varification } from "../controllers/auth.controllers.js";


const router = express.Router();

router.post("/register", [
    body("name").isLength({min:3}).withMessage('Name must be at least 3 characters long'),
    body("email").isEmail().withMessage('Please provide a valid email'),
    body("password").isLength({min: 6}).withMessage('Password must be at least 6 characters long')
],register )

router.post("/login", [
    body("email").isEmail().withMessage('Please provide a valid email'),
    body("password").isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], login )

router.post("/token-varification", [
    body("email").isEmail().withMessage("please provide a valid email"),
    body("token").isLength({min: 4}).withMessage("please provide a valid token")
], token_varification)

export default router