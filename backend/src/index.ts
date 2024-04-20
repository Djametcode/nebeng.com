import 'dotenv/config'
import express from 'express'
import { connectDB } from './database/connectDB';
const app = express();

async function startServer() {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(3000, () => console.log("Server running ..."))
    } catch (error) {
        console.log(error)
    }
}

startServer()