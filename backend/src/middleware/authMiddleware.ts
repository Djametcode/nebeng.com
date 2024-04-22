import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;

    if (!header || !header.startsWith(`Bearer `)) {
        return res.status(401).json({ msg: "please login first" })
    }

    const token = header.split(" ")[1]
    console.log(token)

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        console.log(data)
        next()
    } catch (error) {
        console.log(error)
    }
}