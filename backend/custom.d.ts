export { }

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URL: string;
            JWT_SECRET: string;
            JWT_TIMES: string;
        }
    }
    namespace Express {
        interface Request {
            user: {
                userId: string;
                email: string;
                username: string
            },
            driver: {
                driverId: string,
                username: string
            }
        }
    }
}