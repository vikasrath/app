import jwt from "jsonwebtoken"

const generateToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not defined");
    }
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: `3d`})

    return token
}

export default generateToken;