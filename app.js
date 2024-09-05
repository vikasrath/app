import express from "express"
import dotenv from 'dotenv';

import connectToDataBase from "./DB/connectToDataBase.js";
import authRouter from "./routes/authroutes.js"

const app = express();
dotenv.config();
const port = process.env.PORT || 5000

app.use(express.json());

app.use("/", authRouter)

app.listen(port, () => {
    connectToDataBase()
    console.log(`server is running on port ${port}`);
})