import jwt from 'jsonwebtoken'

interface Idata {
    userId: string
    email: string
    username?: string
}

export const jwtTokenGenerator = (data: Idata) => {
    return jwt.sign({
        userId: data.userId,
        email: data.email,
        username: data.username
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIMES })
}