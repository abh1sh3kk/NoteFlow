import { Request, Response, NextFunction } from "express";

interface MyRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

export function authenticateUser(req: MyRequest, res: any, next: NextFunction) {
    const { email, password } = req.body;
    console.log(req.body);

    const validateCredentials = (email: string, password: string) => {
        console.log(email, password);
        return true;
    };

    const isValidatedUser = validateCredentials(email, password);

    next();
}
