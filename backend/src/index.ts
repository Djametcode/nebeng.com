import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './database/connectDB';
import { authRouter } from './routes/authRoutes';
import { driverRouter } from './routes/driverRoutes';
const app = express();

app.use(cors({
    origin: ["*"]
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v19/nebengdotcom/auth', authRouter)
app.use('/api/v19/nebengdotcom/driver', driverRouter)

async function startServer() {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(3000, () => console.log("Server running ..."))
    } catch (error) {
        console.log(error)
    }
}

startServer()